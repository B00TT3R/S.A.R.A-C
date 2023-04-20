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
    <div className='flex flex-wrap drop-shadow-md ' {...rest}>              
        {formatArray(data.links).map((e, i)=>(
            <button className={
                classNames(
                    'w-10 h-10 ring-1 hover:ring-inset  grid place-content-center ring-black',
                    "first:rounded-l-md last:rounded-r-md last:ring-r",
                    "hover:brightness-90 focus:brightness-90 focus:outline-none transition-all duration-75",
                    "font-semibold",
                    e.active ?"bg-black text-white" : "text-black bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
                    "active:bg-black active:text-white"

                )}
                disabled={e.url===null || e.active}
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
