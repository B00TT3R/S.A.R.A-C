import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import { classNames } from '@/Utils'
import StyleHash from './Utils/StyleHash'

import {PageSpinner, Pagination, Select} from '<>'

export default function Errors() {
  const [url, setUrl] = useState("api/errors")
  const [orderBy, setOrderBy] = useState("id")
  const [order, setOrder] = useState("desc")
  
  const {data, refetch, isFetching} = useQuery('getErrors',async ()=> await axios.get<paginatedValue<any>>(url, 
    {params:{orderBy, order}
  }))

  useEffect(()=>{
    refetch()
  },[url, order, orderBy])

  return (
    <div className='w-full h-full grid gap-2 content-start  relative'>
      <header className="text-2xl">
        <h1>Erros:</h1>
      </header>
      <div className='flex flex-col items-start w-full gap-1 pb-3 '>
          {
            isFetching
            ?
              <PageSpinner size='text-7xl'/>
            :
              <>
                {/* orderby */}
                <div className='flex gap-2'>
                  <div className='grid'>
                    <span>Ordernar por: </span>
                    <Select 
                      onChange={({target})=>setOrderBy((target as HTMLSelectElement).value)}
                      value={orderBy}
                    >
                      <option value="id">ID</option>
                      <option value="type">Tipo</option>
                    </Select>
                  </div>
                  <div className='grid'>
                    <span>Ordem: </span>
                    <Select 
                      onChange={({target})=>setOrder((target as HTMLSelectElement).value)}
                      value={order}
                    >
                      <option value="asc">Crescente</option>
                      <option value="desc">Decrescente</option>
                    </Select>
                  </div>
                </div>
                <ul className='grid gap-1 w-full'>
                  {data?.data.data.map((error:any)=>(
                    <li
                      key={error.id}
                      className={
                        classNames(
                          'cursor-pointer w-full grid content-start bg-white border-2 p-3 rounded-md shadow-sm shadow-gray-300 hover:brightness-95 transition-all',
                          "",
                          StyleHash[error.type].wrapper,
                        )
                    }>
                      <span><b>Tipo:</b> {error.type}</span>
                      <span><b>id:</b> {error.id}</span>
                    </li>
                  ))}
                </ul>
                <div className='sticky bottom-0'>
                  <Pagination
                    data={data!.data}
                    handleChange={setUrl}
                  />
                </div>
              </>
          }
      </div>
      
    </div>
  )
}
