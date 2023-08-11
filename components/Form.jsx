'use client'

import React from 'react'
import { useState } from "react";

import Dropzone from '@components/Dropzone'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span>{type} Item</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, ex id! Fuga quos illum vel iusto odio nulla molestias hic?
            </p>

            <form onSubmit={handleSubmit} className='mt-10 w-full max-w-screen-2xl flex flex-col gap-7 glassmorphism'>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Item name
                    </span>
                    <input 
                    value={post.name}
                    onChange={(e) => setPost({...post, name: e.target.value})}
                    placeholder='Enter your Item name'
                    required
                    className='form_input'
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Image for your Item
                    </span>
                    <Dropzone 
                        post={post}
                        setPost={setPost}
                        // files={files}
                        // setFiles={setFiles}
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        How many item is currently in your stock
                    </span>
                    <input 
                    value={post.stockMax}
                    onChange={(e) => setPost({...post, stockMax: e.target.value})}
                    placeholder='Enter your Stock quanity'
                    required
                    type="number"
                    className='w-2 form_input'
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        What describe your item
                    </span>
                    <textarea 
                    value={post.description}
                    onChange={(e) => setPost({...post, description: e.target.value})}
                    placeholder='Write your item description...'
                    className='form_textarea'
                    />
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Tag {' '}
                        <span className='font-normal'>
                            (#sensor, #acuator, #structure)
                        </span>
                    </span>
                    <input
                    value={post.tag}
                    onChange={(e) => setPost({...post, tag: e.target.value})}
                    placeholder='#tag'
                    required
                    className='form_input'
                    />
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <a href="/" className="text-gray-500 text-md">
                        Cancel
                    </a>

                    <button type="submit" disabled={submitting} className='text-white px-5 py-1.5 text-md rounded-full bg-primary-green'>
                        {submitting ? `${type}...`: type}
                    </button>
                </div>

            </form>
        </section>
    )
}

export default Form