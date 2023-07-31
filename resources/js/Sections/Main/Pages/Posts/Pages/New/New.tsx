import { useReducer } from 'react'
import TextPrompt from './Template/TextPrompt/TextPrompt';
import { Context, initialState, reducer } from './Context/Context';
import ImagePrompt from './Template/ImagePrompt/ImagePrompt';
import { BigButton, PageSpinner } from '<>';
import { useQuery } from 'react-query';
import { titleHandler } from '@/Utils';
import api from "@/Utils/api"

export default function NewPòst() {
  titleHandler("Criar Post")
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isFetching, data, refetch } = useQuery(
    "createPost", 
    async () => await api.post('/api/createPost', {
      message: state.textResult,
      url: state.imageResult
    }),
    {
        enabled: false,
        retry:false,
    }
  )
  const handleCreate = () => {
    refetch()
  }
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className='w-full gap-2 flex flex-col'>
        <header className="text-2xl">
          <h1>
            <b>Criar Post:</b>
          </h1>
        </header>
        <div className='flex flex-col items-start justify-start w-full gap-2 pb-3 '>
          <TextPrompt/>
          <ImagePrompt/>
        </div>
        {/* textResult */}
        <div>
          {state.textLoading
          ?
            <PageSpinner />
          :
            <p>
              {state.textResult}
            </p>
          }
        </div>
        {/* imageResult */}
        <div>
          {state.imageLoading
          ?
            <PageSpinner />
          :
            state.imageResult &&
            <img src={state.imageResult} alt="" />
          }
        </div>
        {
          isFetching 
          ? 
            <PageSpinner/> 
          :
            <>
              <a
                href={data?.data.facebook}
                className='text-blue-500 hover:text-blue-600 hover:underline'
                target="_blank"
              >
                {data?.data.facebook}
              </a>
              {data?.data.instagram &&
                <a
                  href={data?.data.instagram}
                  className='text-blue-500 hover:text-blue-600 hover:underline'
                  target="_blank"
                >
                  {data?.data.instagram}
                </a>
              }
            </>
        }
        {
          state.textResult && !(state.textLoading || state.imageLoading) &&
          <div className='w-full flex justify-start'>
            <BigButton
              label='Criar Post'
              disabled={isFetching}
              onClick={handleCreate}
            />
          </div>
        }
      </div>
    </Context.Provider>
  )
}
