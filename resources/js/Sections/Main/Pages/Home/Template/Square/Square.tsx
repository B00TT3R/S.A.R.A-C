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
            'w-full border rounded-sm shadow-md p-2 grid gap-1 content-start',
            "transition-all duration-500 group",
            "hover:rounded-md cursor-pointer",
            "shadow-gray-200 bg-white hover:shadow-lg border-1",
            "dark:shadow-none dark:bg-slate-950 dark:border-2 dark:border-slate-800",
            
        )}
        onClick={()=>navigate(to)}
    >
        <header className='font-semibold text-lg w-full flex items-center gap-2'>{title}</header>
        {children}
    </article>
  )
}
