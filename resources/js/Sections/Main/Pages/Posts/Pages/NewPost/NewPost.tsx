import {useContext, useReducer} from 'react'
import TextPrompt from './Template/TextPrompt/TextPrompt';
import { Context, initialState, reducer } from './Context/Context';
import ImagePrompt from './Template/ImagePrompt/ImagePrompt';

export default function NewPòst() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className='w-full h-full gap-2 flex flex-col relative'>
        <header className="text-2xl">
          <h1>
            <b>Criar Post:</b>
          </h1>
        </header>
        <div className='flex flex-col items-start w-full gap-2 pb-3 '>
          <TextPrompt/>
          <ImagePrompt/>
        </div>
        {/* titleResult */}
        <div>
          <p>
            {state.titleResult}
          </p>
        </div>
      </div>
    </Context.Provider>
  )
}
