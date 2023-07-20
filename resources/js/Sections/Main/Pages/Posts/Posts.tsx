import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {paginatedValue} from '-ts/paginatedValue'
import {NewButton, PageSpinner, Pagination, Select} from '<>'
import post from './Types/post'
import Card from './Template/Card/Card'
import { titleHandler } from '@/Utils'
import api from "@/Utils/api"

export default function Posts() {
  titleHandler("Posts")
  const [url, setUrl] = useState("/api/posts")
  const [orderBy, setOrderBy] = useState("id")
  const [order, setOrder] = useState("desc")
  const [isDeleting, setIsDeleting] = useState(false)
  
  const {data, refetch, isFetching} = useQuery('getPosts',async ()=> await api.get<paginatedValue<post[]>>(url, 
    {params:{orderBy, order}
  }))

  useEffect(()=>{
    refetch()
  },[url, order, orderBy])

  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>Posts:</h1>
      </header>
      <div className='flex flex-col items-start w-full h-full flex-1 gap-2'>
          {
            isFetching || isDeleting
            ?
              <PageSpinner size='text-7xl'/>
            :
              <>
                {/* orderby */}
                <div className='flex gap-1 sm:gap-2 w-full text-sm sm:text-base'>
                  <div className='grid'>
                    <span>Ordenar por: </span>
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
                  <NewButton to="novo"/>
                </div>
                <ul className='grid gap-2 w-full pb-3'>
                  {data?.data.data.map((post)=>(
                    <Card post={post} onDelete={refetch} isDeleting={setIsDeleting} key={post.id}/>
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
