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
        className="rounded-md py-2 ring-slate-400 transition-all focus:ring-slate-600 cursor-pointer" 
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
