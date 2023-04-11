import React, {HTMLAttributes} from 'react'

interface props extends HTMLAttributes<HTMLSelectElement>{
    value?:string;
    children?: React.ReactNode
}
export default function Select({value, children, ...rest}:props) {
  return (
    <select 
      className="rounded-md py-2 ring-slate-400 transition-all focus:ring-slate-600 cursor-pointer" 
      value={value}
      {...rest}
    >
        {children}
    </select>
  )
}
