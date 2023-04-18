import React, { useContext } from 'react'
import { Input } from '<>';
import { FaLightbulb } from 'react-icons/fa';
import { classNames } from '@/Utils';
import { Context } from '../../Context/Context';

export default function ImagePrompt() {
    const {state, dispatch} = useContext(Context)
    return (
        <div className='flex w-full gap-4 items-end'>
            <Input
            name="title"
            label="Prompt da imagem"
            placeholder='Digite o prompt da imagem, a ser passado para a IA'
            onChange={(e)=>dispatch({type:"setImagePrompt", payload:e.target.value})}
            value={state.imagePrompt}
            />
            <div className='h-full pt-7'>
            <button 
                className={classNames('bg-black h-full border p-3 text-white rounded hover:bg-gray-800 hover:ring-2 ring-black transition-all duration-300')}
            >
                <FaLightbulb/>
            </button>

            </div>
        </div>
    )
}
