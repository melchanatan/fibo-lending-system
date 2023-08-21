'use client'

import React, { useEffect, useState, useRef } from 'react'
import ItemCard from './ItemCard'
import CartCard from './CartCard';
import Confirm from './Confirm'
import {SkeletonCard} from  './SkeletonCard';
import ScrollToTop from './ScrollToTop'

import { motion, AnimatePresence } from "framer-motion"
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Router, useRouter } from 'next/navigation'
import Link from "next/link"
const ItemCardList = ({ data, addToCart, maxIndex, setMaxIndex}) => {
    const [parent] = useAutoAnimate({duration: 100, easing: "ease-in-out"});

    return (
        <div>
            <ScrollToTop maxIndex={maxIndex}/>
            <div ref={parent} className='mb-[3vw] justify-self-start h-fit justify-items-start grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 lg:gap-8 max-h-auto'>          
            {data.slice(0, maxIndex).map( (post) => (    
                <ItemCard
                    post={post}
                    addToCart={addToCart}
                />
            ))}
            </div>
            {
                maxIndex < data.length &&
                <a onClick={() => {setMaxIndex(maxIndex + 9);}} className='cursor-pointer justify-self-center font-inter text-xl underline text-primary-green hover:text-slate-600 transition-all'>show more</a>
            }

        </div>
    );
};

const LoadingSkeleton = (num) => {
    let skeletonCards = Array(6).fill(0)

    return (
        <div>
            <div className='mb-[3vw] w-full grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 lg:gap-8'>          
            { skeletonCards.map((index) => <SkeletonCard key={index} /> )}
            </div>
        </div>
    );
}

const Cart = ({ router, data, setItemInCart, itemInCart, setAllPosts }) => {
    
    const [submitting, setSubmitting] = useState(false);
    const [groupNumber, setGroupNumber] = useState("");
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [wantedStockList, setWantedStockList] = useState([])
    const [confirming, setConfirming] = useState(false)
    const problemItem = {}
    var flag = false
    const maxGroupNumber = 12;

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
                                problemItem[o._id] = o.stockCurrent

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
            } else {
                console.log(problemItem)
                itemInCart.forEach( (item) => {
                    item["stockCurrent"] = problemItem[item._id] ? problemItem[item._id] : item.stockCurrent
                    item["bgColor"] = problemItem[item._id] ? "red" : "none"
                })
            }
        }
    }

    const [parent] = useAutoAnimate({duration: 100, easing:'ease-in-out'});

    return (
        <form id="cart" Submit={handleSubmit} className='z-20 sticky top-[5vh] h-fit bg-primary-green sm:w-1/2 w-full md:w-[40%] !pr-4 px-8 ml-0 sm:ml-4 md:ml-0 md:px-8 sm:px-6 lg:px-8 flex flex-col max-h-fit py-7 justify-between mt-12 sm:mt-0'>
            {confirming && <Confirm handleBack={handleBack} itemInCart={itemInCart} tel={tel} name={name} groupNumber={groupNumber} />}
            <h3 className='text-left text-white text-[2rem] font-satoshi tracking-wider font-bold'>
                Cart
            </h3>
            <ul ref={parent} className='min-h-[30vh] max-h-[60vh] sm:h-[50vh] mt-6 flex flex-col gap-6 overflow-y-auto overflow-x-hidden pr-2'>
                {data && data.map( (post) => (
                    <CartCard 
                        post={post}
                        setItemInCart={setItemInCart}
                        itemInCart={itemInCart}
                    />
                ))}
            </ul>
            <div className='pt-8 sm:pt-4'>
                <label className='flex'>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        Tel
                    </span>
                    <span className='font-semibold text-lg xt-base text-white tracking-wide mr-1'>
                        :
                    </span>
                    <input 
                        value={tel}
                        onChange={ (e) => setTel(e.target.value) }
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
                    <span className='font-semibold text-lg text-white tracking-wide hidden md:inline sm:inline lg:hidden'>
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
                        min="1"
                        max={maxGroupNumber}
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
    const [activeItem, setActiveItem] = useState("ALL");
    const indexStep = 9
    const [maxIndex, setMaxIndex] = useState(6)
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        const response = await fetch('/api/item');
        const data = await response.json();

        const outOfStock = []
        const inStock = []
        data.forEach( (a) => {
            if (a.stockCurrent > 0) inStock.push(a)
            else outOfStock.push(a)
        })
        
        inStock.sort( (a, b) => {
            if (a.name < b.name) {return -1}
            else if (a.name > b.name) {return 1}
        })
        
        const allItems = inStock.concat(outOfStock)
        setAllPosts(allItems);
        setSearchedResults(allItems);
        setLoading(false)
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

    const listInnerRef = useRef()
    const onScroll = () => {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          if (scrollTop + clientHeight === scrollHeight) {
            console.log("reached bottom");
          }
        }
      };
    
    return (
        <section onScroll={onScroll} ref={listInnerRef} className='mt-6 sm:mt-16 flex-col flex sm:flex-row md:gap-[1vw] lg:gap-[2vw] text-center justify-items-start'>
            <div className='sm:w-1/2 w-full md:w-2/3 px-10 sm:px-6'>
                <ul className='flex gap-x-[7vw] sm:gap-x-[2vw] gap-y-4 mb-8 items-end flex-wrap'>
                    <li onClick={ (e) => {tagSelect("");  setActiveItem(e.target.innerText); setMaxIndex(indexStep)}} className={activeItem === "ALL" ? 'link_text link_text--active' : 'link_text'}>ALL</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText); setMaxIndex(indexStep)}} className={activeItem === "Acuator" ? 'link_text link_text--active' : 'link_text'}>Acuator</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText); setMaxIndex(indexStep)}} className={activeItem === "Sensor" ? 'link_text link_text--active' : 'link_text'}>Sensor</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText); setMaxIndex(indexStep)}} className={activeItem === "Supply" ? 'link_text link_text--active' : 'link_text'}>Supply</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText); setMaxIndex(indexStep)}} className={activeItem === "Mechanic" ? 'link_text link_text--active' : 'link_text'}>Mechanic</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText); setMaxIndex(indexStep)}} className={activeItem === "Controller" ? 'link_text link_text--active' : 'link_text'}>Controller</li>
                </ul>
                {/* { searchedResults.length != 0 ? (
                    <ItemCardList  data={searchedResults} addToCart={addToCart} maxIndex={maxIndex} setMaxIndex={setMaxIndex}/> 
                ) : (
                    <p className='py-[8vh] w-full text-gray-500 mt-[5vh]'>Item list empty.</p>
                )}   */}
                { !loading ? (
                    <ItemCardList data={searchedResults} addToCart={addToCart} maxIndex={maxIndex} setMaxIndex={setMaxIndex}/> 
                ) : (
                    <LoadingSkeleton />
                )}  
            </div>
            <Cart router={router} data={itemInCart} setItemInCart={setItemInCart} itemInCart={itemInCart} setAllPosts={setAllPosts} />
        </section>
    )
}

export default Feed