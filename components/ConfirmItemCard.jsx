import React from 'react'
import Image from "next/image"

const ConfirmItemCard = ({item}) => {
  return (
    <div className='gap-2 flex items-center justify-between border-white border-b-[2px] p-2'>
        <div className='gap-3 flex items-center'>
            <Image
                src={item.image ? item.image : "/assets/images/placeholder-image.png"}
                alt="item_image"
                width="60"
                height="60"
                className=""
            />
            <h2 className='font-inter font-light text-lg sm:text-xl text-white text-left w-[50vw] max-w-[45rem]'>{item.name}</h2>
        </div>
        
        <div className='flex gap-3 sm:gap-6'>
            <p className='font-inter font-bold text-lg sm:text-xl text-white'>{item.wantedStock}</p>
            <p className='font-inter text-lg sm:text-xl text-white'>EA</p>
        </div>
        
    </div>
  )
}

export default ConfirmItemCard