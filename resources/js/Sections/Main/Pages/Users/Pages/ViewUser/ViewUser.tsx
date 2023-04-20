import { PageSpinner } from '<>'
import { DateFormatter } from '@/Utils'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function ViewError() {
  const {id} = useParams()
  const [notFound, setNotFound] = useState(false)
  const {data, refetch, isFetching, error} = useQuery(
    'getError', 
    async ()=> await axios.get(`/api/errors/${id}`),
    {
      retry:false
    }
  )
  
  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>
          <b>Erro:</b> {id}
        </h1>
      </header>
      <div className='flex flex-col items-start w-full h-full flex-1 gap-2 pb-3 '>
          {
            isFetching
            ?
              <PageSpinner size='text-7xl'/>
            :
            <>
              {error
                ?
                  (
                    (axios.isAxiosError(error) && error.response?.status === 404)
                      ?
                        <h1 className='text-xl text-center'>O erro requisitado não existe!</h1>
                      :
                        <h1 className='text-xl text-center'>Erro desconhecido</h1>
                  )
                :
                    <div className='flex flex-col gap-2'>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Mensagem:</h3>
                        {data?.data.message}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Tipo:</h3>
                        {data?.data.type}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Criado em:</h3>
                        {data?.data.created_at?DateFormatter(data.data.created_at):"sem valor"}
                      </div>
                    </div>
              }
            </>
          }
        </div>
    </div>
  )
}
