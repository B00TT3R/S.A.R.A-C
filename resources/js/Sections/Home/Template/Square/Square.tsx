import { classNames } from '@/Utils'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface props{
    title:string|ReactNode
    to:string
    children?: ReactNode
}
export default function Square({
    title,
    to,
    children
}:props) {
    const navigate = useNavigate()
  return (
    <article
        className={classNames(
            'w-full h-52 bg-white border rounded-sm shadow-md shadow-gray-200 p-2 grid gap-1 content-start',
            "transition-all duration-500 group",
            "hover:shadow-lg hover:rounded-md cursor-pointer"
        )}
        onClick={()=>navigate(to)}
    >
        <header className='font-semibold text-lg w-full flex items-center gap-2'>{title}</header>
        {children}

    </article>
  )
}
