import { paginatedValue, link } from '-ts/paginatedValue'
import { classNames } from '@/Utils'
import { HTMLAttributes } from 'react'
interface props {
    data:paginatedValue<any>
    handleChange:(url:string) => void
    rest?:HTMLAttributes<HTMLDivElement>
    
}
function formatArray(array:link[]):typeof array{
    array[0].label = "<"
    array[array.length-1].label = ">"
    return array
}
export default function Pagination({data, handleChange, ...rest}:props) {
  return (
    <div className='flex shadow-md shadow-gray-300' {...rest}>              
        {formatArray(data.links).map((e, i)=>(
            <button className={
                classNames(
                    'w-10 h-10 border border-r-0 last:border-r grid place-content-center border-slate-400',
                    "first:rounded-l-md last:rounded-r-md",
                    "hover:backdrop-brightness-90 transition-colors",
                    "font-semibold",
                    "disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed",
                    e.active?"bg-slate-400 text-white":"text-black bg-white"

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
