import { PageSpinner } from '<>'
import { DateFormatter } from '@/Utils'
import api from '@/Utils/api'
import { FacebookEmbed } from 'react-social-media-embed';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import FacebookPreview from '../../Template/FacebookPreview/FacebookPreview'

export default function ViewError() {
  const {id} = useParams()
  const {data, refetch, isFetching, error} = useQuery(
    'getPost', 
    async ()=> await api.get(`/api/posts/${id}`),
    {
      retry:false
    }
  )
  
  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>
          <b>Post:</b> {id}
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
                    (api.isAxiosError(error) && error.response?.status === 404)
                      ?
                        <h1 className='text-xl text-center'>A geração requisitada não existe!</h1>
                      :
                        <h1 className='text-xl text-center'>Erro desconhecido</h1>
                  )
                :
                    <div className='flex flex-col gap-2'>
                      <div>
                        <h3 className='text-xl font-semibold'>URL:</h3>
                        <a target="_blank" href={data?.data.url} className='text-blue-500 hover:text-blue-600 hover:underline'>{data?.data.url}</a>
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold'>Tipo:</h3>
                        {data?.data.type}
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold'>Envio:</h3>
                        <pre className='whitespace-pre-wrap text-gray-700'>
                          {JSON.stringify(data?.data.request, null,2)}
                        </pre>
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold'>Resposta:</h3>
                        <code>
                          <pre className='whitespace-pre-wrap text-gray-700'>{JSON.stringify(data?.data.response, null, 2)}</pre>
                        </code>
                      </div>
                      
                      <div>
                        <h3 className='text-xl font-semibold'>Criado em:</h3>
                        {data?.data.created_at?DateFormatter(data.data.created_at):"sem valor"}
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold'>Preview:</h3>
                        <FacebookPreview url={data?.data.url}/>
                      </div>
                    </div>
              }
            </>
          }
        </div>
    </div>
  )
}
