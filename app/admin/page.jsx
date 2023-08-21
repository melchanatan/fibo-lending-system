'use client'
import { useEffect, useState } from 'react'
import ItemCard from '@components/ItemCard'
import { Router, useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/solid'

const Admin = () => {
    const router = useRouter();
    const [itemInCart, setItemInCart] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [searchedResults, setSearchedResults] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    const ItemCardList = ({ data, addToCart}) => {
        return (
            <div className='justify-self-start h-fit justify-items-start grid grid-cols-3 md:grid-cols-5 gap-4 lg:gap-8 max-h-auto'>          
                {data.map( (post) => (    
                    <ItemCard
                        post={post}
                        addToCart={addToCart}
                        type="admin"
                        handleDelete={handleDelete} 
                        handleEdit={handleEdit}
                        handleReset={handleReset}
                    />
                ))}
            </div>
        );
    };

    const fetchPosts = async () => {
        const response = await fetch('/api/item');
        const data = await response.json();

        setAllPosts(data);
        setSearchedResults(data);
    }

    const handleReset = async (post) => {
        try {
            const response = await fetch(`/api/item/${post._id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: post.name,
                    description: post.description,
                    tag: post.tag,
                    stockMax: post.stockMax,
                    stockCurrent: post.stockMax
                })
            })
        } catch (error) {
            console.log(error);
        } 
    } 

    const handleEdit = (post) => {
        router.push(`/admin/update-item?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
          "Are you sure you want to delete this Item?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/item/${post._id.toString()}`, {
                method: "DELETE",
                });
        
                const filteredPosts = searchedResults.filter((item) => item._id !== post._id);
        
                setSearchedResults(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const filterItem = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) => regex.test(item.tag)
        );
    };

    useEffect( () => {
        fetchPosts();
    }, []);

    const tagSelect = (itemName) => {
        const searchResult = filterItem(itemName);
        setSearchedResults(searchResult);
    }

    return (
        <section className='w-full max-w-full flex-start flex-col px-6'>
            <h1 className='head_text !text-clamp-md text-left'>
                <span>Admin's Item editor</span>
            </h1>
            <div className='w-full'>
                <ul className='flex gap-x-[3.6vw] gap-y-3 mb-8 items-end flex-wrap'>
                    <li onClick={ (e) => {tagSelect("");  setActiveItem(e.target.innerText)}} className={activeItem === "ALL" ? 'link_text link_text--active' : 'link_text'}>ALL</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Acuator" ? 'link_text link_text--active' : 'link_text'}>Acuator</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Sensor" ? 'link_text link_text--active' : 'link_text'}>Sensor</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Supply" ? 'link_text link_text--active' : 'link_text'}>Supply</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Mechanic" ? 'link_text link_text--active' : 'link_text'}>Mechanic</li>
                    <li onClick={ (e) => {tagSelect(e.target.innerText);  setActiveItem(e.target.innerText)}} className={activeItem === "Controller" ? 'link_text link_text--active' : 'link_text'}>Controller</li>

                </ul>
            </div>
            { searchedResults.length != 0 ? (
                <ItemCardList  data={searchedResults} addToCart={ () => {} }/> 
            ) : (
                <p className='w-full text-gray-500 mt-[5vh]'>Item list empty.</p>
            )}  
            <button
                type='button'
                className='fixed bottom-[4rem] right-[5vw] flex h-[5rem] w-[5rem] items-center justify-center rounded-full border border-primary-green bg-primary-green transition-colors hover:bg-white'
                onClick={() => router.push("/admin/create-item")}
            >
                <PlusIcon className='h-[3rem] w-[3rem] fill-white transition-colors hover:fill-primary-green' />
            </button>
        </section>
    )
}

export default Admin