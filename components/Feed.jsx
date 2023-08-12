'use client'

import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import CartCard from './CartCard';
import Confirm from './Confirm'

import { Router, useRouter } from 'next/navigation'
import Link from "next/link"
const ItemCardList = ({ data, addToCart}) => {
    return (
        <div className='justify-self-start h-fit justify-items-start grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 max-h-auto'>          
            {data.map( (post) => (    
                <ItemCard
                    post={post}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
};

const Cart = ({ router, data, setItemInCart, itemInCart, setAllPosts }) => {
    
    const [submitting, setSubmitting] = useState(false);
    const [groupNumber, setGroupNumber] = useState("");
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [wantedStockList, setWantedStockList] = useState([])
    const [confirming, setConfirming] = useState(false)
    var flag = false

    const handleBack = () => {
        setConfirming(false)
    }

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
                                flag = true
                            }
                            const buffer = o
                            buffer["stockCurrent"] = stockRemaining
                            result.push(buffer)
                        }
                    })
                }
            )}
            
        } catch(error) {
            console.log(error);
        } finally {
            setSubmitting(false)
            if (!flag) {
                setConfirming(true)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='h-fit bg-primary-green w-full !pr-4 px-8 ml-0 sm:ml-4 md:ml-0 md:px-8 sm:px-2 lg:px-8 sm:w-[40%] flex flex-col max-h-fit py-7 justify-between'>
            {confirming && <Confirm handleBack={handleBack} itemInCart={itemInCart} tel={tel} name={name} groupNumber={groupNumber} />}
            <h3 className='text-left text-white text-[2rem] font-satoshi tracking-wider font-bold'>
                Cart
            </h3>
            <ul className='h-[50vh] mt-6 flex flex-col gap-6 overflow-y-auto pr-2'>
                {data && data.map( (post) => (
                    <CartCard 
                        post={post}
                        setItemInCart={setItemInCart}
                        itemInCart={itemInCart}
                    />
                ))}
            </ul>
            <div>
                
                <label className='flex'>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        Tel
                    </span>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        :
                    </span>
                    <input 
                        value={tel}
                        onChange={ (e) => setTel(e.target.value)}
                        placeholder=''
                        required
                        type="tel"
                        className='translate-y-[-6px] font-montserrat focus:mx-2 mx-6 w-full text-lg bg-primary-green border-b-2 text-center px-3 text-white border-white mb-4 placeholder-slate-300 select duration-200 remove-arrow ease-in transition-all outline-none'
                    />
                </label>
                <label className='flex'>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        Nickname
                    </span>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        :
                    </span>
                    <input 
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        placeholder=''
                        required
                        type="input"
                        className='translate-y-[-6px] font-montserrat focus:mx-2 mx-6 w-full text-lg bg-primary-green border-b-2 text-center px-3 text-white border-white mb-4 placeholder-slate-300 select duration-200 remove-arrow ease-in transition-all outline-none'
                    />
                </label>
                <label className='flex'>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        {"Group "}
                    </span>
                    <span className='font-semibold text-lg text-white tracking-wide inline lg:hidden md:flex sm:flex'>
                        :
                    </span>
                    <span className='font-semibold text-lg text-white tracking-wide inline lg:flex md:hidden sm:hidden'>
                        Number:
                    </span>
                    <input 
                        value={groupNumber}
                        onChange={ (e) => setGroupNumber(e.target.value)}
                        placeholder=''
                        required
                        type="number"
                        className='translate-y-[-6px] font-montserrat focus:mx-2 mx-6 w-full text-lg bg-primary-green border-b-2 text-center px-3 text-white border-white mb-4 placeholder-slate-300 select duration-200 remove-arrow ease-in transition-all outline-none'
                    />
                </label>
            

                <button type="submit" disabled={submitting} className='!text-lg white_btn w-full'>
                    send{submitting && "ing..."}
                </button>
            </div>
        
        </form>
    )
}

const Feed = () => {
    const router = useRouter();

    const [itemInCart, setItemInCart] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [searchedResults, setSearchedResults] = useState([]);
    const [activeItem, setActiveItem] = useState(null);


    const fetchPosts = async () => {
        const response = await fetch('/api/item');
        const data = await response.json();

        setAllPosts(data);
        setSearchedResults(data);
    }

    const filterItem = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) => regex.test(item.tag)
        );
    };

    useEffect( () => {
        fetchPosts();
    }, []);


    const addToCart = (post) => {
    
        // TODO: Click to add by 1
        // check duplicate in cart
        const found = itemInCart.some(current => current._id === post._id);
        if (!found) setItemInCart([...itemInCart, post])
    }

    const tagSelect = (itemName) => {
        const searchResult = filterItem(itemName);
        setSearchedResults(searchResult);
    }

    return (
        <section className='mt-16 flex-col flex sm:flex-row md:gap-10 lg:gap-20 text-center justify-items-start'>
            <div className='sm:w-2/3 w-full'>
                <ul className='flex gap-x-[3.6vw] gap-y-3 mb-8 items-end flex-wrap'>
                    <li onClick={ (e) => {tagSelect("");  setActiveItem(e.target.innerText)}} className={activeItem === "ALL" ? 'link_text link_text--active' : 'link_text'}>ALL</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Acuator" ? 'link_text link_text--active' : 'link_text'}>Acuator</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Sensor" ? 'link_text link_text--active' : 'link_text'}>Sensor</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Supply" ? 'link_text link_text--active' : 'link_text'}>Supply</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Mechanic" ? 'link_text link_text--active' : 'link_text'}>Mechanic</li>
                </ul>
                { searchedResults.length != 0 ? (
                    <ItemCardList  data={searchedResults} addToCart={addToCart}/> 
                ) : (
                    <p className='w-full text-gray-500 mt-[5vh]'>Item list empty.</p>
                )}  
            </div>
            <Cart router={router} data={itemInCart} setItemInCart={setItemInCart} itemInCart={itemInCart} setAllPosts={setAllPosts} />
        </section>
    )
}

export default Feed