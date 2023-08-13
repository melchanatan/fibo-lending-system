'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const page = () => {
  const router = useRouter()

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(  () => {
    async function wait() {
      await delay(1500);
      router.push("/")
    }

    wait()
  })

  return (
    <div className='items-center fixed w-full h-full bg-primary-green top-0 right-0 p-5 flex justify-center'>
      <h1 className='head_text !text-white font-bold max-w-full max-w-[70vw] text-center'>done, <br></br> your order have been place</h1>
    </ div>
  )
}

export default page