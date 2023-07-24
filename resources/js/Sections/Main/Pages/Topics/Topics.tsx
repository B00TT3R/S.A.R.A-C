import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {NewButton, PageSpinner, Square} from '<>'
import topic from './Types/topic'
import { titleHandler } from '@/Utils'
import api from "@/Utils/api"

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
                {/* orderby */}
                <div className='flex gap-2 w-full'>

                  <NewButton to="novo"/>
                </div>
                <ul className='grid gap-5 w-full pb-3 grid-cols-3'>
                  {data?.data.map((e, i)=>
                    <Square
                      key={i}
                      title={e.name}
                      to="a"
                      //className='aspect-square'
                    >
                      <span><b>Estilos de texto: </b>{e.infos.text}</span>
                      <span><b>Estilos de Imagem: </b>{e.infos.image}</span>
                      <span><b>Informações Raiz: </b>{e.infos.textinfo}</span>
                      <span><b>Posts Totais: </b>{e.infos.total}</span>
                      {/* <span><b>Ultima Geração: </b>{new Date().toLocaleString()}</span> */}
                    </Square>
                  )}
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
