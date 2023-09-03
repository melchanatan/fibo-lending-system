import React from 'react'
import OrderItemCard from '@components/OrderItemCard';

const OrderCard = ({order}) => {
  return (
    <section className='w-full flex justify-between align-middle min-h-[5rem] flex-col shadow-md rounded-md gap-3'>
        <div className='bg-primary-green rounded-md p-2'>
            <div className='flex gap-5 w-full items-start'>
                <h2 className='text-4xl rounded-lg top-[50%] text-white bg-primary-green min-w-[2ch] w-[5vw] py-[1vw] text-center font-bold'>{order.customerGroup}</h2>
                <ul className='flex flex-col w-[13rem]'>
                    <li className=''>{order.timestamp}</li>
                    <li className=''>{order.customerName}</li>
                    <li className=''>{order.customerTel}</li>
                </ul>
            </div>
        </div>
        
        <div className='w-full justify-self-start align-self-center'>
            {
                order.items.map( (item) => (
                    <OrderItemCard item={item}/>
                ))
            }
        </div>
    </section>
  )
}

export default OrderCard