"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { connectToDB } from "@utils/database";
import { Router, useRouter } from 'next/navigation';


const Nav = () => {
    
  const { data: session } = useSession();
  const router = useRouter()

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {

        const response1 = await getProviders();
        setProviders(response1);

    }

    setUpProviders();
    
    if (!session) {
        router.push("/admin/unauthenticated")
    }
  } ,[])

  return (
    <nav className="flex-between w-full mb-16 pt-3 px-6">
        <Link rel="stylesheet" href="/" className="flex gap-2 flex-center"> 
            <Image 
                src="/assets/images/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="object-container"
            />
            <h1 className="logo_text">FRA161</h1>
        </Link>

        {/* Desktop Navigation*/}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href='/admin/manage-order' className='black_btn'>
                        Orders
                    </Link>
                    <Link href='/admin' className='black_btn'>
                        Inventory
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>
                    
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"           
                    />
                        
                </div>
            ):
            (
                <div> 
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))}
                </div>
            )}
        </div>

        {/* Mobile Navigation*/}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile" 
                        onClick={() => setToggleDropdown((prev) => !prev)}          
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href='/admin/manage-order' className='dropdown_link'>
                                Manage Orders
                            </Link>
                            <Link href='/admin' className='dropdown_link'>
                                Manage Inventory
                            </Link>
                            <button 
                            type="button" 
                            onClick={() => {
                                setToggleDropdown(false); 
                                signOut();
                            }}
                            className="mt-5 w-full black_btn"
                            >Sign Out</button>
                        </div>
                    )}
                </div>
            ): (
            <> 
                {providers &&
                    Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.di)} className="black_btn">
                            Sign In
                        </button>
                    ))}
            </>) 
            }
        </div>
    </nav>
    
  )
}

export default Nav