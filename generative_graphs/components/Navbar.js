'use client'
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-violet-950 flex justify-between items-center h-20 text-gray-100'>
            <div className='p-4 font-bold text-xl flex justify-center items-center gap-3'>
                <Image width={55} height={55} unoptimized src="/logo.gif" alt="" />
                <h1>WebCrawler</h1>
            </div>
            <div>
                <ul className='flex gap-5 p-4 font-bold text-xl'>
                    <li className='hover:underline hover:cursor-pointer'>Home</li>
                    <li className='hover:underline hover:cursor-pointer'>About</li>
                    <li className='hover:underline hover:cursor-pointer'>Contact</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
