import { classNames } from '@/Utils'
import React from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

interface props{
  size?:string
}
export default function PageSpinner({
  size="text-7zl"
}:props) {
  return (
    <div className="w-full h-full flex-1 grid place-content-center">
        <CgSpinnerTwoAlt className={
          classNames(
            'animate-spin',
            size
          )}/>
    </div>
  )
}
