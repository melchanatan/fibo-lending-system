"use client"

import { useSession } from 'next-auth/react'
import { Router, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import Form from "@components/Form"

const CreateItem = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const itemId = searchParams.get("id")
    var oldImage = ""

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        name: "",
        description: "",
        tag: "",
        image: "",
        stockMax: 0,
        stockCurrent: 0
    });

    useEffect(() => {
        const getItemDetails = async () => {
          const response = await fetch(`/api/item/${itemId}`);
          const data = await response.json();

          setPost({
            name: data.name,
            description: data.description,
            tag: data.tag,
            image: data.image,
            stockMax: data.stockMax,
            stockCurrent: data.stockMax
          });

        };
    
        if (itemId) getItemDetails();
      }, [itemId]);

    const updateItem = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        if (!itemId) return alert("Missing Item Id!")
        try {
            const response = await fetch(`/api/item/${itemId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: post.name,
                    description: post.description,
                    tag: post.tag,
                    stockCurrent: post.stockMax
                })
            })
            if (response.ok) {
                router.push("/admin/")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        } 
    }

  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateItem}
    />
)}  


export default CreateItem;