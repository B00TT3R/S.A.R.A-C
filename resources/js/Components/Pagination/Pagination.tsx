import { paginatedValue, link } from '-ts/paginatedValue'
import { classNames } from '@/Utils'
import React from 'react'
interface props{
    data:paginatedValue<any>
    handleChange:(url:string) => void
}
function formatArray(array:link[]):typeof array{
    console.log(array)
    array[0].label = "<"
    array[array.length-1].label = ">"
    return array
}
export default function Pagination({data, handleChange}:props) {
  return (
    <div className='flex'>              
        {formatArray(data.links).map((e, i)=>(
        <button className={
            classNames(
                'w-10 h-10 border border-r-0 last:border-r grid place-content-center border-slate-400',
                "first:rounded-l-md last:rounded-r-md",
                "hover:backdrop-brightness-90 transition-colors",
                "font-semibold",
                "disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed",
                e.active?"bg-slate-400 text-white":"text-black"

            )}
            disabled={e.url===null}
            key={i}
            //onClick={()=>setPage(i+1)}
            onClick={()=>handleChange(e.url as string)}
        >
            {e.label}
        </button>
        ))}
    </div>
  )
}
