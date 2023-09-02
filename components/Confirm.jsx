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
                                alert("Stock remaining is less than wanted amount.")
                            }
                            const buffer = o
                            buffer["stockCurrent"] = stockRemaining
                            result.push(buffer)
                        }
                    })
                }
            )}
            
            const orderBeenPlaced = await placeOrder()
            if (orderBeenPlaced) {
                router.push("/confirm")
                setOrderBeenPlace(true)
            }
            else {
                alert("Error Placing order")
            }

            // Make change to database
            if (orderBeenPlace) {
                result.forEach( async (item) => {
                    try {
                        const response = await fetch(`/api/item`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                id: item._id,
                                stockCurrent: item.stockCurrent,
                            }),
                        });
                        
                    } catch (error) {
                        updatingDBError = true
                        alert("Unable to update item(s) in database");
                }})
            }

        } catch(error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
            <div className='fixed w-full h-full bg-primary-green top-0 right-0 z-30 p-5 flex justify-center'>
                <main className='w-[60rem] flex flex-col justify-between pb-2 sm:py-[5vh]'>
                    <h1 className='head_text !text-clamp-md !text-white text-left'>
                        Please check your cart
                    </h1>
                    <div className='flex-col sm:items-end sm:flex-row items-end pt-2 sm:pt-10 pb-3 flex-start flex gap-2 border-white border-b-[2px] p-2'>
                        <div className='flex gap-4'>
                            <h3 className='text-3xl sm:text-4xl text-white'>Group</h3>
                            <h2 className='mr-7 text-5xl font-semibold text-white -translate-y-[10px] sm:-translate-y-[5px]'>{groupNumber}</h2>
                        </div>
                        
                        <p className='mr-4 text-2xl text-white -translate-y-[5px] -mt-2'>Tel: {tel}</p>
                        <p className='text-2xl text-white -translate-y-[5px] -mt-2'>Name: {name}</p>
                    </div>
                    
                    <section className='overflow-auto h-[55vh]'>
                        {itemInCart && itemInCart.map( (post) => (
                            <ConfirmItemCard item={post}/>
                        ))}
                    </section>
                    <div className='flex justify-between pt-7'>
                        <a onClick={handleBack} disabled={submitting} className="text-2xl text-white underline hover:text-gray-200 ">Back</a>
                        <button onClick={handleSubmit} disabled={submitting} className='white_btn font-semibold !text-xl !px-[5vw]'>
                            Confirm{submitting && "ing..."}
                        </button>
                    </div>
                    
                </main>
            
            </div>
  )
}

export default Confirm