import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'

const CartCard = ({post, setItemInCart, itemInCart, isOutOfStock}) => {
  const [wantedStock, setWantedStock] = useState(1)
  const [bgRed, setBgRed] = useState(false)

  const isOut = () => {
    if (post.bgColor === "red")  {
      // console.log
      setBgRed(true)
    }
  }

  const deleteSelf = () => {
    setItemInCart((current) => current.filter((p) => p._id != post._id))
  }


  const handleWantedStock = (newValue) => {
    if (newValue != "") {
      if (parseInt(newValue) <= 0) deleteSelf()
      else if (parseInt(newValue) >= post.stockCurrent) setWantedStock(post.stockCurrent)
      else setWantedStock(newValue)
    } else {
      setWantedStock(newValue)
    }

    setBgRed(false)
    post['bgColor'] = "none"
  }

  const handleL = (newValue) => {
    if (parseInt(newValue) <= 0) deleteSelf()
    else setWantedStock(newValue)
    post['bgColor'] = "none"
    setBgRed(false)
  }
  
  // const updateWantedStock = () => {
  //   var buffer = itemInCart;
  //     buffer.forEach((item) => {
  //       if (item._id == post._id) {
  //         item["wantedStock"] = parseInt(wantedStock)
  //         setItemInCart(buffer)
  //       }
  //   })
  //   console.log("hello")
  // }

  useEffect( () => {
    // if (post.wantedStock > post.stockCurrent) {
    //   setBgRed(true)
    //   setWantedStock(post.stockCurrent)
    // }
    isOut()
    var buffer = itemInCart;
    buffer.forEach((item) => {
      if (item._id == post._id) {
        item["wantedStock"] = parseInt(wantedStock)
        setItemInCart(buffer)
      }
    })

  })


  return (
    <div className={bgRed ? 'bg-red-400 flex justify-between align-middle min-h-[5rem] border-md' : 'flex justify-between align-middle min-h-[5rem]'}>
    
      <div className='flex items-center gap-3'>
        {/* div1 */}
        <div className='flex items-center relative group h-full w-[5rem]'>
          <Image
            src={post.image ? post.image : "/assets/images/placeholder-image.png"}
            alt="item_image"
            width="70"
            height="70"
            className="object-contain rounded-md bg-white h-full w-full"
          /> 
          <span onClick={deleteSelf} className='flex justify-center items-center rounded-md absolute h-full w-full top-0 right-0 bg-gray-700 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20'>
            <XMarkIcon className='h-10 w-10 fill-white transition-colors' />
          </span>
        </div>

        {/* div2 */}
        <label className='flex flex-col align-start text-left max-w-[80%]'>
          <h3 className='font-semibold text-white'>
            {post.name}
          </h3>
          <p className='text-left'>
            {post.stockCurrent} left
          </p>
        </label>

        {/* div3 */}
        {/* <div className='hidden items-center sm:flex lg:hidden'>
          <a onClick={() => handleWantedStock(wantedStock-1)} className="translate-y-[-1px] active:scale-90 hover:scale-125 transition-all select-none text-2xl px-2 text-white font-montserrat cursor-pointer" href="">-</a>
          <input type="text" className='w-[4ch] text-center' value={wantedStock} onChange={(e) => handleWantedStock(e.target.value)}/>
          <a onClick={() => handleWantedStock(wantedStock+1)} className="active:scale-90 hover:scale-125 transition-all select-none text-2xl px-2 text-white font-montserrat cursor-pointer" href="">+</a>
        </div> */}
      
      </div>
      <div className='flex items-center'>
        <a onClick={() => handleL(wantedStock-1)} className="flex sm:hidden lg:flex translate-y-[-1px] active:scale-90 hover:scale-125 transition-all select-none text-4xl p-1 text-white font-montserrat cursor-pointer" href="">-</a>
        <input type="number" className='w-[4ch] text-center' value={wantedStock} onChange={(e) => handleWantedStock(e.target.value)}/>
        <a onClick={() => handleWantedStock(wantedStock+1)} className="flex sm:hidden lg:flex active:scale-90 hover:scale-125 transition-all select-none text-3xl p-1 text-white font-montserrat cursor-pointer" href="">+</a>
      </div>
    </div>
    
  )
}

export default CartCard