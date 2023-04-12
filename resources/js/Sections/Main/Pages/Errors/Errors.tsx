import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import { classNames } from '@/Utils'
import StyleHash from './Utils/StyleHash'

import {PageSpinner, Pagination, Select} from '<>'
import { Link } from 'react-router-dom'

export default function Errors() {
  const [url, setUrl] = useState("/api/errors")
  const [orderBy, setOrderBy] = useState("id")
  const [order, setOrder] = useState("desc")
  
  const {data, refetch, isFetching} = useQuery('getErrors',async ()=> await axios.get<paginatedValue<any>>(url, 
    {params:{orderBy, order}
  }))

  useEffect(()=>{
    refetch()
  },[url, order, orderBy])

  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>Erros:</h1>
      </header>
      <div className='flex flex-col items-start w-full h-full flex-1 gap-2 pb-3 '>
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
                <ul className='grid gap-2 w-full'>
                  {data?.data.data.map((error:any)=>(
                    <li
                      key={error.id}
                      className={
                        classNames(
                          'cursor-pointer w-full bg-white border-2 p-3 rounded-sm hover:brightness-95 ',
                          "hover:shadow-inner transition-all shadow-md",
                          "shadow-gray-100",
                          StyleHash[error.type].wrapper,
                        )
                    }>
                      <Link to={error.id.toString()} className="w-full h-full grid content-start">
                        <span><b>Tipo:</b> {error.type}</span>
                        <span><b>ID:</b> {error.id}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className='sticky bottom-0 w-full'>
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
