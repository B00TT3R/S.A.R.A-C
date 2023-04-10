import React from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'


export default function PageSpinner() {
  return (
    <div className="w-full h-full flex-1 grid place-content-center">
        <CgSpinnerTwoAlt className='animate-spin text-7xl'/>
    </div>
  )
}
