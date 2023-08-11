import React from 'react'
import Image from "next/image"

const ConfirmItemCard = ({item}) => {
  return (
    <div className='pt-5 flex items-center justify-between border-white border-b-[2px] p-2'>
        <div className='gap-3 flex items-center'>
            <Image
                src={post.image ? post.image : "/assets/images/placeholder-image.png"}
                alt="item_image"
                width="60"
                height="60"
                className=""
            />
            <h2 className='font-satoshi font-bold text-2xl text-white'>{item.name}</h2>
        </div>
        
        <div className='flex gap-6'>
            <p className='font-satoshi font-bold text-2xl text-white'>{item.wantedStock}</p>
            <p className='font-satoshi text-2xl text-white'>EA</p>
        </div>
        
    </div>
  )
}

export default ConfirmItemCard