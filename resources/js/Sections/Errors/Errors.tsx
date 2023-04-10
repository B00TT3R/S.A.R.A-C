import PageSpinner from '<>/PageSpinner/PageSpinner'
import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import { classNames } from '@/Utils'
import StyleHash from './Utils/StyleHash'

export default function Errors() {
  const [page, setPage] = useState(1)
  const {data, isLoading, isFetching} = useQuery('getErrors',async ()=> await axios.get<paginatedValue<any>>("api/errors",{params: {page}}))

  return (
    <div className='w-full grid gap-2'>
      <header className="text-2xl">
        <h1>Erros:</h1>
      </header>
      <ul className='grid gap-1'>
        {
          isFetching
          ?
            <PageSpinner size='text-7xl'/>
          :
            data?.data.data.map((error:any)=>(
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
            ))
        }
      </ul>
    </div>
  )
}
