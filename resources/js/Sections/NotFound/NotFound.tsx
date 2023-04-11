import { classNames } from '@/Utils'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center'>
        <h1 style={{textShadow:"0px 4px 5px gray"}} className='text-9xl'>404</h1>
        <h3 style={{textShadow:"0px 4px 5px gray"}} className='text-xl'>Essa página não foi encontrada, por favor verifique a URL</h3>
        <Link 
            className={classNames(
                "bg-black text-white px-3 py-2 text-xl rounded-md mt-4 shadow-md shadow-gray-400 border border-gray-500",
                "hover:bg-gray-800 transition-all"
            )} 
            to="/"
        >
            Home
        </Link>
    </section>
  )
}
