import { PageSpinner,Switch } from '<>'
import {useContext} from 'react'
import { DateFormatter } from '@/Utils'
import api from '@/Utils/api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '@/Context/GlobalContext'

export default function ViewError() {
  const {allPermissions} = useContext(GlobalContext);
  const {id} = useParams()
  const {data, refetch, isFetching, error} = useQuery(
    'getError', 
    async ()=> await api.get(`/api/users/${id}`),
    {
      retry:false
    }
  )
  
  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>
          <b>Usuário:</b> {id}
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
                        <h1 className='text-xl text-center'>O erro requisitado não existe!</h1>
                      :
                        <h1 className='text-xl text-center'>Erro desconhecido</h1>
                  )
                :
                    <div className='flex flex-col gap-2'>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Nome:</h3>
                        {data?.data.name}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>E-mail:</h3>
                        {data?.data.email}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Permissões:</h3>
                          <div className="grid gap-1">
                            {allPermissions.map((e:any,i:number)=>
                              <Switch
                                key={e}
                                label={e}
                                name={e}
                                checked={allPermissions.includes(e)}
                                disabled
                              />
                            )}
                          </div>
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Criado em:</h3>
                        {data?.data.created_at?DateFormatter(data.data.created_at):"sem valor"}
                      </div>
                      <div className="">
                        <h3 className='text-xl font-semibold'>Atualizado em:</h3>
                        {data?.data.created_at?DateFormatter(data.data.updated_at):"sem valor"}
                      </div>
                    </div>
              }
            </>
          }
        </div>
    </div>
  )
}
