"use client"

import React, {useState} from 'react'
import ConfirmItemCard from "./ConfirmItemCard"
import Link from "next/link"
import { useRouter } from 'next/navigation'


const Confirm = ({ handleBack, itemInCart, tel, name ,groupNumber }) => {
    const router = useRouter()
    
    const [orderBeenPlace, setOrderBeenPlace] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const placeOrder = async () => {
        const timestamp = new Date().toLocaleString().replace(',','')
        const filteredItem = itemInCart.map( ({name, wantedStock}) => ({name, wantedStock}))
        try {
            const response = await fetch('/api/order/new', {
                method: "POST",
                body: JSON.stringify({
                    customerName: name,
                    customerTel: tel,
                    customerGroup: groupNumber,
                    timestamp: timestamp,
                    items: filteredItem
                })
            })
            if (response.ok) {
                return true
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error placing Order.")
        } 
    }
    const handleSubmit = async () => {
        setSubmitting(true)
        //Make change to database
        var updatingDBError = false
        try {
            const response = await fetch('/api/item');
            const d = await response.json();

            const result = []

            // TODO: optimize database
            if (response.ok) {
                itemInCart.forEach( (item) => {
                    let obj = d.find((o, i) => {
                        if (o._id == item._id) {
                            const stockRemaining = o.stockCurrent - item.wantedStock
                            if (stockRemaining < 0) {
                                alert("no no")
                            }
                            const buffer = o
                            buffer["stockCurrent"] = stockRemaining
                            result.push(buffer)
                        }
                    })
                }
            )}
            
            // Make change to database
            result.forEach( async (item) => {
                try {
                    console.log(item._id)
                    const response = await fetch(`/api/item`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            id: item._id,
                            stockCurrent: item.stockCurrent,
                        }),
                    });
                    
                } catch (error) {
                    updatingDBError = true
                    console.log(error);
            }})

            if (!updatingDBError) {
                const orderBeenPlaced = await placeOrder()
                if (orderBeenPlaced) router.push("/confirm")
                else {
                    alert("Error Placing order")
                }
            }
        } catch(error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
            <div className='fixed w-full h-full bg-primary-green top-0 right-0 z-30 p-5 flex justify-center'>
                <main className='w-[60rem] '>
                    <h1 className='head_text !text-clamp-md !text-white text-left'>
                        Please check your Cart
                    </h1>
                    <div className='flex-col sm:flex-row items-end pt-10 pb-4 flex-start flex gap-2'>
                        <div className='flex gap-4 items-end'>
                            <h3 className='text-3xl sm:text-4xl font-semibold text-white'>Group</h3>
                            <h2 className='mr-7 text-5xl font-bold text-white'>{groupNumber}</h2>
                        </div>
                        
                        <p className='mr-4 text-2xl text-white'>Tel: {tel}</p>
                        <p className='text-2xl text-white'>Name: {name}</p>
                    </div>
                    
                    <section className='overflow-auto h-[55vh]'>
                        {itemInCart && itemInCart.map( (post) => (
                            <ConfirmItemCard item={post}/>
                        ))}
                    </section>
                    <div className='flex justify-between pt-7'>
                        <a onClick={handleBack} disabled={submitting} className="text-2xl font-light text-white underline hover:text-gray-200">Back</a>
                        <button onClick={handleSubmit} disabled={submitting} className='white_btn !text-xl !px-[5vw]'>
                            confirm{submitting && "ing..."}
                        </button>
                    </div>
                    
                </main>
            
            </div>
  )
}

export default Confirm