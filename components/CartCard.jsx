import React, { useEffect, useState } from 'react'
import Image from 'next/image'
const CartCard = ({post, setItemInCart, itemInCart, wantedStockList, setWantedStockList}) => {
  const [wantedStock, setWantedStock] = useState(1)

  
  const handleWantedStock = (e) => {

    if (e.target.value > post.stockCurrent) {
      setWantedStock(post.stockCurrent)
      return
    } 
    setWantedStock(e.target.value)
    // var buffer = post;
    var buffer = itemInCart;
    buffer.forEach((item) => {
      if (item._id == post._id) {
        item["wantedStock"] = parseInt(wantedStock)
        setItemInCart(buffer)
      }
    })
  }

  useEffect( () => {
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
      <div className='flex items-center gap-4'>
        <Image
          src="/assets/images/2507562-40.jpg"
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
        <a className="translate-y-[-1px] active:scale-90 hover:scale-125 transition-all select-none text-4xl p-2 text-white font-montserrat cursor-pointer" href="">-</a>
        <input type="text" className='w-[4ch] text-center' value={wantedStock} onChange={(e) => handleWantedStock(e)}/>
        <a className="active:scale-90 hover:scale-125 transition-all select-none text-3xl p-2 text-white font-montserrat cursor-pointer" href="">+</a>
        <button 
        onSubmit={false} onClick={() => {setItemInCart((current) => current.filter((p) => p._id != post._id))}} 
        className='hover:bg-gray-600 text-white text-lg w-[3ch] h-[3ch] rounded-full bg-gray-500 font-montserrat'
        > x </button>
      </div>
    </div>
  )
}

export default CartCard