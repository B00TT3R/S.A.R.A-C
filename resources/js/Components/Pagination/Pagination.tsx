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
                        'w-10 h-10 ring-1 hover:ring-inset  grid place-content-center ring-black dark:ring-slate-700',
                        "first:rounded-l-md last:rounded-r-md last:ring-r",
                        "focus:outline-none transition-all duration-75",
                        "hover:brightness-90 focus:brightness-90",
                        "dark:hover:brightness-100 dark:focus:brightness-100",
                        "dark:hover:bg-slate-900 dark:focus:bg-slate-900",
                        "font-semibold",
                        e.active 
                        ?
                            `
                            bg-black text-white
                            dark:bg-slate-800 dark:text-slate-200
                            `                            
                        :
                            `
                            disabled:cursor-not-allowed
                            text-black bg-white disabled:bg-gray-100 disabled:text-gray-400 
                            dark:text-white dark:bg-black dark:disabled:bg-slate-800 dark:disabled:text-slate-500
                            `,

                        "active:bg-black active:text-white",
                        "dark:active:bg-slate-800 dark:active:text-slate-200",

                    )}
                    disabled={e.url===null || e.active}
                    key={i}
                    onClick={()=>handleChange(e.url as string)}
                >
                    {e.label}
                </button>
            ))}
        </div>
    )
}
