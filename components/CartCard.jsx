import React, { useEffect, useState } from 'react'
import Image from 'next/image'
const CartCard = ({post, setItemInCart, itemInCart, isOutOfStock}) => {
  const [wantedStock, setWantedStock] = useState(1)
  const [bgRed, setBgRed] = useState(false)

  const isOut = (isOutOfStock) => {
    if (isOutOfStock)  {
      // console.log
      setBgRed(true)
    }
  }

  const deleteSelf = () => {
    setItemInCart((current) => current.filter((p) => p._id != post._id))
  }


  const handleWantedStock = (newValue) => {
    if (newValue <= 0) {
      deleteSelf()
    } else if (newValue >= post.stockCurrent) {
      setBgRed(true)
      setWantedStock(post.stockCurrent)
    } else {
      setWantedStock(newValue)
      
      var buffer = itemInCart;
      buffer.forEach((item) => {
        if (item._id == post._id) {
          item["wantedStock"] = parseInt(wantedStock)
          setItemInCart(buffer)
        }
      })
    }
  
  }
  
  useEffect( () => {
    if (post.wantedStock >= post.stockCurrent) {
      setBgRed(true)
      setWantedStock(post.stockCurrent)
    }
    var buffer = itemInCart;
    buffer.forEach((item) => {
      if (item._id == post._id) {
        item["wantedStock"] = parseInt(wantedStock)
        setItemInCart(buffer)
      }
    })
    console.log(itemInCart)
  })


  return (
    <div className='flex justify-between align-middle'>
      {bgRed && <div> hello </div>}
    
      <div className='flex items-center'>
        <button 
          type="button"
          onClick={deleteSelf}
          className='hover:bg-gray-600 text-white text-lg w-[2.4ch] h-full bg-red-400 font-montserrat rounded-l-md'
        > x </button>
        <Image
          src={post.image ? post.image : "/assets/images/placeholder-image.png"}
          alt="item_image"
          width="70"
          height="70"
          className="object-contain rounded-r-md mr-3 bg-white h-full"
        />
        <label className='flex flex-col text-left sm:ml-4 ml-0 md:ml-0 '>
          <h3 className='font-semibold tracking-wide text-white'>
            {post.name}
          </h3>
          <p className='text-left'>
            {post.stockCurrent} left
          </p>
          <div className='hidden items-center sm:flex lg:hidden'>
            <a onClick={() => handleWantedStock(wantedStock-1)} className="translate-y-[-1px] active:scale-90 hover:scale-125 transition-all select-none text-2xl px-2 text-white font-montserrat cursor-pointer" href="">-</a>
            <input type="text" className='w-[4ch] text-center' value={wantedStock} onChange={(e) => handleWantedStock(e.target.value)}/>
            <a onClick={() => handleWantedStock(wantedStock+1)} className="active:scale-90 hover:scale-125 transition-all select-none text-2xl px-2 text-white font-montserrat cursor-pointer" href="">+</a>
          </div>
        </label>
      </div>
      <div className='flex items-center sm:hidden lg:flex'>
        <a onClick={() => handleWantedStock(wantedStock-1)} className="inline translate-y-[-1px] active:scale-90 hover:scale-125 transition-all select-none text-4xl p-2 text-white font-montserrat cursor-pointer" href="">-</a>
        <input type="text" className='w-[4ch] text-center' value={wantedStock} onChange={(e) => handleWantedStock(e.target.value)}/>
        <a onClick={() => handleWantedStock(wantedStock+1)} className="inline active:scale-90 hover:scale-125 transition-all select-none text-3xl p-2 text-white font-montserrat cursor-pointer" href="">+</a>
      </div>
    </div>
    
  )
}

export default CartCard