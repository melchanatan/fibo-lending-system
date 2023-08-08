'use client'

import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import CartCard from './CartCard';

const ItemCardList = ({ data, addToCart}) => {
    console.log(data)
    return (
        <div className='justify-self-start h-fit justify-items-start grid sm:w-2/3 w-full grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 max-h-auto'>          
            {data.map( (post) => (    
                <ItemCard
                    post={post}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
};

const Cart = ({ data, setItemInCart, itemInCart, setAllPosts }) => {
    const [submitting, setSubmitting] = useState(false);
    const [groupNumber, setGroupNumber] = useState(0);
    const [wantedStockList, setWantedStockList] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        // check with Database
        try {
            const response = await fetch('/api/item');
            const d = await response.json();

            const result = []
    
            setAllPosts(d);
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
                            d[i] = buffer
                        }
                    });

                })
        

            }

        } catch(error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
        
    }

    return (
        <div className='h-fit bg-primary-green w-full px-8 ml-0 sm:ml-4 md:ml-0 md:px-8 sm:px-2 lg:px-8 sm:w-[40%] flex flex-col max-h-fit py-7 justify-between'>
            <h3 className='text-left text-white text-[2rem] font-satoshi tracking-wider font-bold'>
                Cart
            </h3>
            <ul className='h-[50vh] mt-6 flex flex-col gap-6 overflow-y-scroll'>
                {data && data.map( (post) => (
                    <CartCard 
                        post={post}
                        setItemInCart={setItemInCart}
                        itemInCart={itemInCart}
                        wantedStockList={wantedStockList}
                        setWantedStockList={setWantedStockList}

                    />
                ))}
            </ul>
            <div>
                <label className='flex'>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        {"Group "}
                    </span>
                    <span className='font-semibold text-lg text-white tracking-wide inline lg:flex md:hidden sm:hidden md:inline'>
                        Number:
                    </span>
                    <input 
                        value={groupNumber}
                        onChange={ (e) => setGroupNumber(e.target.value)}
                        placeholder=''
                        required
                        type="number"
                        className='font-montserrat focus:mx-2 mx-6 w-full text-lg bg-primary-green border-b-2 text-center px-3 text-white border-white mb-4 placeholder-slate-300 select duration-200 remove-arrow ease-in transition-all outline-none'
                    />
                </label>
                <button onClick={handleSubmit} disabled={submitting} className='!text-lg white_btn w-full'>
                    send{submitting && "ing..."}
                </button>
            </div>
        
        </div>
    )
}

const Feed = () => {
    const [itemInCart, setItemInCart] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch('/api/item');
        const data = await response.json();
        console.log(data)

        setAllPosts(data);
    }


    useEffect( () => {
        fetchPosts();
    }, []);


    const addToCart = (post) => {
        // check duplicate in cart
        const found = itemInCart.some(current => current._id === post._id);
        if (!found) setItemInCart([...itemInCart, post])
    }

    return (
        <section className='mt-16 flex-col flex sm:flex-row md:gap-10 lg:gap-20 text-center justify-items-start'>
            { allPosts ? (
                <ItemCardList data={allPosts} addToCart={addToCart}/> 
            ) : (
                <p className='w-full text-center text-gray-500'>Item list empty.</p>
            )}  
            <Cart data={itemInCart} setItemInCart={setItemInCart} itemInCart={itemInCart} setAllPosts={setAllPosts} />
        </section>
    )
}

export default Feed