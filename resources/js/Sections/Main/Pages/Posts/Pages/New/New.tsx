import { useReducer } from 'react'
import TextPrompt from './Template/TextPrompt/TextPrompt';
import { Context, initialState, reducer } from './Context/Context';
import ImagePrompt from './Template/ImagePrompt/ImagePrompt';
import { PageSpinner } from '<>';
import { useQuery } from 'react-query';
import { titleHandler, api } from '@/Utils';

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
            <a
              href={data?.data.url}
              className='text-blue-500 hover:text-blue-600 hover:underline'
              target="_blank"
            >
              {data?.data.url}
            </a>
        }
        {
          state.textResult && !(state.textLoading || state.imageLoading) &&
          <div className='w-full flex justify-start'>
            <button
              className="bg-black rounded hover:bg-gray-800 text-white p-2 hover:ring-2 ring-black transition-all duration-300 disabled:bg-gray-700"
              disabled={false}
              onClick={handleCreate}
            >
              Criar Post
            </button>
          </div>
        }
      </div>
    </Context.Provider>
  )
}
