"use client"

import React, {useEffect, useState} from 'react'
import { useSession } from "next-auth/react";
import { redirect } from 'next/dist/server/api-utils';
import { Router, useRouter } from 'next/navigation';

const Unauthenticated = () => {
    const { data: session } = useSession()
    const [UserNotAdmin, setUserNotAdmin] = useState(false)
    const router = useRouter()

    useEffect( () => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/user/${session?.user.id}`);
          const data = await response.json();
            
          if (data.permission === "admin") {
            router.push("/admin")
          } else {
            setUserNotAdmin(true)
          }
        };
    
            if (session?.user.id) {
                fetchPosts();
            }
        }, [session?.user.id]);

    return (
        <div>
            {
            !UserNotAdmin ? (
                <div> Please, sign in first. </div>
            ) : (
                <div> Your don't have the permission to view this page </div>
            )
        }
        </div>   
    )
}

export default Unauthenticated