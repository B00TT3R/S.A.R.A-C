import PageSpinner from '<>/PageSpinner/PageSpinner'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import { classNames } from '@/Utils'
import StyleHash from './Utils/StyleHash'
import Pagination from '<>/Pagination/Pagination'

export default function Errors() {
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("api/errors")
  const {data, refetch, isFetching} = useQuery('getErrors',async ()=> await axios.get<paginatedValue<any>>(url))
  useEffect(()=>{
    refetch()
  },[url])

  return (
    <div className='w-full grid gap-2'>
      <header className="text-2xl">
        <h1>Erros:</h1>
      </header>
        {
          isFetching
          ?
            <PageSpinner size='text-7xl'/>
          :
          <>
            <ul className='grid gap-1'>
              {data?.data.data.map((error:any)=>(
                <li
                  key={error.id}
                  className={
                    classNames(
                      'cursor-pointer w-full grid content-start bg-white border-2 p-3 rounded-md shadow-sm shadow-gray-300 hover:brightness-95 transition-all',
                      StyleHash[error.type].wrapper
                    )
                }>
                  <span><b>Tipo:</b> {error.type}</span>
                  <span><b>id:</b> {error.id}</span>
                </li>
              ))}
            </ul>
            <Pagination
             data={data!.data}
             handleChange={setUrl}
            />
            {/* <div className='flex'>              
              {[...Array(data?.data.last_page)].map((e, i)=>(
                <button className={
                  classNames(
                    'w-10 h-10 border-2 border-r-0 last:border-r-2 grid place-content-center border-slate-500',
                    "first:rounded-l-md last:rounded-r-md text-black",
                    "hover:text-white hover:bg-slate-500 transition-colors"
                  )}
                  key={i}
                  onClick={()=>setPage(i+1)}
                >
                  {i + 1}
                </button>
              ))}
            </div> */}
      </>
            
            
        }
      
    </div>
  )
}
