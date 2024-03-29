"use client"
import React, { useEffect, useState } from 'react'
import OrderCard from '@components/OrderCard';
import { ArrowPathIcon } from '@heroicons/react/24/solid'

const ManageOrder = () => {

    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const response = await fetch('/api/order');
        const data = await response.json();


        setOrders(data.reverse())
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <section className='w-full max-w-full flex-start flex-col px-6'>
            <h1 className='head_text !text-clamp-md text-left pb-6 md:pb-10'>
                <span>Admin's Order manager</span>
            </h1>
            <button
                type='button'
                className='fixed bottom-[4rem] right-[5vw] flex h-[5rem] w-[5rem] items-center justify-center rounded-full border border-primary-green bg-primary-green transition-colors hover:bg-white'
                onClick={() => fetchOrders()}
            >
                <ArrowPathIcon className='h-[3rem] w-[3rem] fill-white transition-colors hover:fill-primary-green' />
            </button>
            <div className='items-start w-full mb-[3vw] justify-self-start h-fit justify-items-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8 lg:gap-8 max-h-auto'>
                {orders.map((order) => (
                    <OrderCard order={order} />
                ))}
            </div>

        </section>
    )
}

export default ManageOrder