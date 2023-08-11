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
      <div className='flex items-center gap-4'>
        <Image
          src={post.image ? post.image : "/assets/images/placeholder-image.png"}
          alt="item_image"
          width="60"
          height="60"
          className="object-contain rounded"
        />
        <label className='flex flex-col text-left'>
          <h3 className='font-semibold tracking-wide text-white'>
            {post.name}
          </h3>
          <p className='text-left'>
            {post.stockCurrent} left
          </p>
        </label>
      </div>
      <div className='flex items-center '>
        <a onClick={() => handleWantedStock(wantedStock-1)} className="translate-y-[-1px] active:scale-90 hover:scale-125 transition-all select-none text-4xl p-2 text-white font-montserrat cursor-pointer" href="">-</a>
        <input type="text" className='w-[4ch] text-center' value={wantedStock} onChange={(e) => handleWantedStock(e.target.value)}/>
        <a onClick={() => handleWantedStock(wantedStock+1)} className="active:scale-90 hover:scale-125 transition-all select-none text-3xl p-2 text-white font-montserrat cursor-pointer" href="">+</a>
        <button 
        onSubmit={false} onClick={deleteSelf}
        className='hover:bg-gray-600 text-white text-lg w-[3ch] h-[3ch] rounded-full bg-gray-500 font-montserrat'
        > x </button>
      </div>
    </div>
    
  )
}

export default CartCard