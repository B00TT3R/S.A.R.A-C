import { PageSpinner } from '<>'
import { DateFormatter } from '@/Utils'
import api from '@/Utils/api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function ViewError() {
  const {id} = useParams()
  const {data, refetch, isFetching, error} = useQuery(
    'getGeneration', 
    async ()=> await api.get(`/api/generations/${id}`),
    {
      retry:false
    }
  )
  
  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>
          <b>Geração:</b> {id}
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
                      <div className="">
                        <h3 className='text-xl font-semibold'>Mensagem:</h3>
                        {data?.data.message}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Tipo:</h3>
                        {data?.data.type}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Tipo de geração:</h3>
                        {data?.data.gen_type=="image"?"Imagem":"Texto"}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Modelo:</h3>
                        {data?.data.model}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Prompt:</h3>
                        {data?.data.prompt}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Resultado:</h3>
                        {data?.data.gen_type == "image"
                        ?
                          <img src={data.data.result} alt="" />
                        :
                          data?.data.result
                        }
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Resposta:</h3>
                        <code>
                          <pre className='whitespace-pre-wrap text-gray-700'>{JSON.stringify(data?.data.response, null, 2)}</pre>
                        </code>
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
