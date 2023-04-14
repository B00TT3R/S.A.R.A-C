import { classNames } from '@/Utils'
import React from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

interface props{
  size?:string
  label?:string
}
export default function PageSpinner({
  size="text-7xl",
  label=""
}:props) {
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-center text-center">
        <CgSpinnerTwoAlt className={
          classNames(
            'animate-spin',
            "justify-center",
            size
        )}/>
        {label && <span>{label}</span>}
    </div>
  )
}
