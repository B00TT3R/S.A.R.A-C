import { useQuery } from 'react-query'
import {NewButton, PageSpinner} from '<>'
import topic from './Types/topic'
import { titleHandler } from '@/Utils'
import api from "@/Utils/api"
import Card from './Template/Card/Card'
import AutomaticGen from './Template/AutomaticGen/AutomaticGen'

export default function Topics() {
  titleHandler("Tópicos")
  const {data, refetch, isFetching} = useQuery('getTopics',async ()=> await api.get<topic[]>
  (
    "/api/topics"    
  ));

  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>Tópicos:</h1>
      </header>
      <div className='flex flex-col items-start w-full h-full flex-1 gap-2'>
          {
            isFetching
            ?
              <PageSpinner size='text-7xl'/>
            :
              <>
              <AutomaticGen/>
                {/* orderby */}
                <div className='flex gap-2 w-full'>

                  <NewButton to="novo"/>
                </div>
                <ul className='w-full pb-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                  {data?.data.map((el, i)=>
                      <Card
                        key={el.name + i}
                        topic={el}
                        onDelete={refetch}
                      />
                  )}
                  {
                    data?.data.length == 0 && 
                    <h2 className="text-xl">Sem tópicos ainda</h2>
                  }
                </ul>
                <div className='sticky bottom-0 w-full'>
                  {/* paginação */}
                </div>                
              </>
          }
      </div>
    </div>
  )
}
