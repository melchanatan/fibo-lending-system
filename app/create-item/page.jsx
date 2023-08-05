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
        itemName: "",
        itemDescription: "",
        tag: "",
        fileName: "",
    });

    const createItem = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(post)

        try {
            const response = await fetch('/api/item/new', {
                method: "POST",
                body: JSON.stringify({
                    itemName: post.itemName,
                    userId: session?.user.id,
                    itemDescription: post.itemDescription,
                    tag: post.tag,
                    fileName: post.fileName
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