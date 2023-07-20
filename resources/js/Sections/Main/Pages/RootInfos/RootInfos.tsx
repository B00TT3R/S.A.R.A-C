import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import {NewButton, PageSpinner, Pagination, Select} from '<>'
import rootInfo from './Types/rootInfo'
import Card from './Template/Card/Card'
import AutomaticGen from './Template/AutomaticGen/AutomaticGen'
import { titleHandler } from '@/Utils'
import api from "@/Utils/api"

export default function RootInfos() {
  titleHandler("Informações Raiz")
  const [url, setUrl] = useState("/api/rootInfos")
  const [orderBy, setOrderBy] = useState("id")
  const [order, setOrder] = useState("desc")
  
  const {data, refetch, isFetching} = useQuery('getRootInfos',async ()=> await api.get<paginatedValue<rootInfo[]>>
  (
    url, 
    {params:{orderBy, order}
  }))

  useEffect(()=>{
    refetch()
  },[url, order, orderBy])

  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>Informações Raiz:</h1>
      </header>
      <div className='flex flex-col items-start w-full h-full flex-1 gap-2'>
        <AutomaticGen/>
          {
            isFetching
            ?
              <PageSpinner size='text-7xl'/>
            :
              <>
                {/* orderby */}
                <div className='flex gap-2 w-full'>
                  <div className='grid'>
                    <span>Ordenar por: </span>
                    <Select 
                      onChange={({target})=>setOrderBy((target as HTMLSelectElement).value)}
                      value={orderBy}
                    >
                      <option value="id">ID</option>
                      <option value="name">Nome</option>
                      <option value="email">Email</option>
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
                  <NewButton to="novo"/>
                  
                </div>
                <ul className='grid gap-2 w-full pb-3'>
                  {data?.data.data.map((rootinfo)=>(
                    <Card rootinfo={rootinfo} onDelete={refetch} key={rootinfo.id}/>
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
