import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { paginatedValue} from '-ts/paginatedValue'
import { PageSpinner, Pagination, Select} from '<>'
import post from './Types/post'
import Card from './Template/Card/Card'
import { titleHandler } from '@/Utils'
import api from "@/Utils/api"
import { useParams } from 'react-router-dom'
import GenerateButton from './Template/GenerateButton/GenerateButton'

export default function Posts() {
    const {id} = useParams()
    titleHandler(`Posts do tópico ${id}`)
    const [url, setUrl] = useState(`/api/topics/${id}/post`)
    const [orderBy, setOrderBy] = useState("id")
    const [order, setOrder] = useState("desc")
    const [isDeleting, setIsDeleting] = useState(false)
    
    const {data, refetch, isFetching} = useQuery('getTopicPosts',async ()=> await api.get<paginatedValue<post[]>>(url, 
        {params:{orderBy, order}
    }))

    useEffect(()=>{
        refetch()
    },[url, order, orderBy])

    const handleGeneration = async()=>{

    }
    return (
        <div className='flex flex-col items-start w-full h-full flex-1 gap-2'>
            {
                isFetching || isDeleting
                ?
                <PageSpinner size='text-7xl'/>
                :
                <>
                    <div className='flex gap-0.5 sm:gap-2 w-full'>
                        <Select 
                            onChange={({target})=>setOrderBy((target as HTMLSelectElement).value)}
                            value={orderBy}
                            label="Ordenar por:"
                        >
                            <option value="id">ID</option>
                            <option value="type">Tipo</option>
                        </Select>
                        <Select 
                            onChange={({target})=>setOrder((target as HTMLSelectElement).value)}
                            value={order}
                            label='Ordem:'
                        >
                            <option value="asc">Crescente</option>
                            <option value="desc">Decrescente</option>
                        </Select>
                    <GenerateButton onFinish={refetch} />
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
    )
}
