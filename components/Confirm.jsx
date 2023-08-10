import React, {useState} from 'react'
import ConfirmItemCard from "./ConfirmItemCard"
import Link from "next/link"
import { useRouter } from 'next/navigation'


const Confirm = ({ handleBack, itemInCart, tel, name ,groupNumber }) => {
    const router = useRouter()

    const [orderBeenPlace, setOrderBeenPlace] = useState(false)
    const handleSubmit = async () => {
        //Make change to database
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
            
                    if (response.ok) {
                        router.push("/confirm")
                    };
                } catch (error) {
                    console.log(error);
            }})
        } catch(error) {
            console.log(error);
        } 
    }

    return (
            <div className='fixed w-full h-full bg-primary-green top-0 right-0 z-30 p-5 flex justify-center'>
                <main className='w-[60rem] '>
                    <h1 className='head_text !text-white text-left'>
                        Please check your Cart
                    </h1>
                    <div className='pt-10 pb-4 flex items-end gap-2'>
                        <h3 className='text-4xl font-semibold text-white'>Group</h3>
                        <h2 className='mr-7 text-5xl font-bold text-white'>{groupNumber}</h2>
                        <p className='mr-4 text-2xl text-white'>Tel: {tel}</p>
                        <p className='text-2xl text-white'>Name: {name}</p>
                    </div>
                    
                    <section className='overflow-auto h-[55vh]'>
                        {itemInCart && itemInCart.map( (post) => (
                            <ConfirmItemCard item={post}/>
                        ))}
                    </section>
                    <div className='flex justify-between pt-7'>
                        <a onClick={handleBack} className="text-2xl font-light text-white underline hover:text-gray-200">Back</a>
                        <button onClick={handleSubmit} className='white_btn !text-xl !px-[5vw]'>Confirm</button>
                    </div>
                    
                </main>
            
            </div>
  )
}

export default Confirm