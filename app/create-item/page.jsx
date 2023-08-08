"use client"

import { useSession } from 'next-auth/react'
import { Router, useRouter } from 'next/navigation'
import { useState } from 'react'

import Form from "@components/Form"

const CreateItem = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        name: "",
        description: "",
        tag: "",
        image: "",
        stockMax: 0,
        stockCurrent: 0
    });

    const createItem = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(post)
        console.log(post.name)

        try {
            const response = await fetch('/api/item/new', {
                method: "POST",
                body: JSON.stringify({
                    name: post.name,
                    userId: session?.user.id,
                    description: post.description,
                    tag: post.tag,
                    image: post.imageUrl,
                    stockMax: post.stockMax,
                    stockCurrent: post.stockMax
                })
            })
            if (response.ok) {
                router.push("/");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        } 
    }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createItem}
    />
)}  


export default CreateItem;