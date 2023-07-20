import { classNames } from '@/Utils';
import React, {HTMLAttributes, useId} from 'react'

interface props extends HTMLAttributes<HTMLSelectElement>{
    label?:string
    value?:string;
    children?: React.ReactNode
    error?:string
}
export default function Select({value, children,label, error, ...rest}:props) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id}>{label}</label>}
      <select 
        className={
          classNames(
            "rounded-md py-2 transition-all cursor-pointer",
            "ring-slate-400 focus:ring-slate-600",            
            "dark:ring-slate-800 dark:focus:ring-slate-900 dark:bg-black",
          )
        }
        value={value}
        id={id}
        {...rest}
      >
        {children}
      </select>
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  )
}
