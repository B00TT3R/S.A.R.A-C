import { PageSpinner } from '<>'
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
        <h1>Erro: {id}</h1>
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
                "a"
            }

              
              
            </>
          }
        </div>
    </div>
  )
}
