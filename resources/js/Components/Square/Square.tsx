import { classNames } from '@/Utils'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'


interface props{
    title:string|ReactNode
    to:string
    children?: ReactNode
    className?:string
}
export default function Square({
    title,
    to,
    children,
    className=""
}:props) {
    const navigate = useNavigate()
    return (
        <article
            className={classNames(
                'w-full rounded-sm shadow-md p-2 grid gap-1 content-start',
                "transition-all duration-500 group",
                "hover:rounded-md cursor-pointer",
                "outline outline-1 outline-gray-200 hover:outline-4",
                "shadow-gray-200 bg-white hover:shadow-lg",
                "dark:shadow-none dark:outline-2 dark:bg-slate-950 dark:outline-slate-800",
                "dark:text-slate-100",
                className
                
            )}
            onClick={()=>navigate(to)}
        >
            <header className='font-semibold text-lg w-full flex items-center gap-2'>{title}</header>
            {children}
        </article>
    )
}
