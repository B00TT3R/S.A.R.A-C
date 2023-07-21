import { classNames } from '@/Utils'
import React from 'react'

interface props extends React.InputHTMLAttributes<HTMLInputElement>{
    name:string
    onChange?:(event:any) => void
    label?:string
    classNames?:string
    error?:string|undefined|any
}
export default function Input({
    name,
    error="",
    label="",
    type="text",
    onChange=() => {},
    className="",
    ...rest
}:props) {
  return (
    <div className='w-full flex flex-col gap-1 relative'>
        <label htmlFor={name}>{label}</label>
        <input
            className={classNames(
                'rounded p-2 bg:white border',
                "dark:bg-gray-950 dark:focus:ring-slate-600 dark:focus:border-slate-600",
                className
            )}
            type={type} 
            name={name}
            onChange={onChange}
            {...rest}
            id={name}
        />
        {error
            ?
                <span className='text-red-500'>{error}</span>
            :
                ""
        }
    </div>
  )
}
