import React from 'react'
import Image from "next/image"

const ConfirmItemCard = ({item}) => {
  return (
    <div className='gap-2 flex justify-between border-gray-300 border-b-[2px] p-2 w-full'>
        <div className='gap-3 flex items-center'>
            {/* <Image
                src={item.image ? item.image : "/assets/images/placeholder-image.png"}
                alt="item_image"
                width="60"
                height="60"
                className=""
            /> */}
            <h2 className='font-inter text-sm sm:text-sm text-left w-full'>{item.name}</h2>
        </div>
        
        <div className='flex gap-1 sm:gap-2'>
            <p className='font-inter font-bold text-sm sm:text-sm text-gray-700'>{item.wantedStock}</p>
            <p className='font-inter text-sm sm:text-sm text-gray-700'>EA</p>
        </div>
        
    </div>
  )
}

export default ConfirmItemCard