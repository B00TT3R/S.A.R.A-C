import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import {PageSpinner, Pagination, Select} from '<>'
import generation from './Types/generation'
import Card from './Template/Card/Card'
import { titleHandler } from '@/Utils'
import api from "@/Utils/api"
import { useParams } from 'react-router-dom'

export default function Generations() {
  const {id} = useParams()
  titleHandler(`Gerações do tópico ${id}`)
  const [url, setUrl] = useState(`/api/topics/${id}/generation`)
  const [orderBy, setOrderBy] = useState("id")
  const [order, setOrder] = useState("desc")
  
  const {data, refetch, isFetching} = useQuery('getTopicGenerations',async ()=> await api.get<paginatedValue<generation[]>>(url, 
    {params:{orderBy, order}
  }))

  useEffect(()=>{
    refetch()
  },[url, order, orderBy])

  return (
      <div className='flex flex-col items-start w-full h-full flex-1 gap-2'>
          {
            isFetching
            ?
              <PageSpinner size='text-7xl'/>
            :
              <>
                {/* orderby */}
                <div className='flex gap-1 sm:gap-2 w-full'>
                    <Select 
                      onChange={({target})=>setOrderBy((target as HTMLSelectElement).value)}
                      value={orderBy}
                      label="Ordenar por:"
                    >
                      <option value="id">ID</option>
                      <option value="type">Tipo</option>
                    </Select>
                    <span></span>
                    <Select 
                      onChange={({target})=>setOrder((target as HTMLSelectElement).value)}
                      value={order}
                      label='Ordem:'
                    >
                      <option value="asc">Crescente</option>
                      <option value="desc">Decrescente</option>
                    </Select>
                </div>
                <ul className='grid gap-2 w-full pb-3'>
                  {data?.data.data.map((error)=>(
                    <Card error={error} key={error.id}/>
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
  )
}
