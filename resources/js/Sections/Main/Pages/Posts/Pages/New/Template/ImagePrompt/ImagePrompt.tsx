import React, { useContext, useEffect, useState } from 'react'
import { Input } from '<>';
import { classNames } from '@/Utils';
import { Context } from '../../Context/Context';
import { useQuery } from 'react-query';
import api from '@/Utils/api';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { FaLightbulb } from 'react-icons/fa';
import { FiRotateCcw } from 'react-icons/fi';


export default function ImagePrompt() {
    const {state, dispatch} = useContext(Context)
    const [error, setError] = useState<undefined|string>()
    const { isFetching, data, refetch } = useQuery(
        "getImageResult", 
        async () => await api.post('/api/getImageResult', {value: state.imagePrompt}),
        {
            enabled: false,
            retry:false,
        }
    )
    const handleClick = () => {
        if (state.imagePrompt.trim() !== '') {
            refetch()
        } else {
            setError("O valor não pode ser nulo")
        }
    }
    const handleReset = () => { 
        dispatch({type:"setImageResult", payload:""})
    }
    
    useEffect(() => {
      dispatch({type:"setImageResult", payload: data?.data.result})
    }, [data])
    
    useEffect(() => {
        dispatch({type:"setImageLoading", payload: isFetching})
      }, [isFetching])
    
    return (
        <div className='flex w-full gap-2 items-end'>
            <Input
                name="image"
                label="Prompt da imagem"
                placeholder='Digite o prompt da imagem, a ser passado para a IA'
                onChange={(e)=>dispatch({type:"setImagePrompt", payload:e.target.value})}
                value={state.imagePrompt}
                error={error}
            />
            <div className='h-full pt-7 flex gap-1'>
                <button 
                    className={classNames(
                        'bg-black border p-3 text-white rounded hover:bg-gray-800 hover:ring-2 ring-black transition-all duration-300',
                        "disabled:bg-gray-700"
                    )}
                    disabled={isFetching}
                    onClick={handleClick}
                >
                    {isFetching
                    ?
                        <CgSpinnerTwoAlt className='animate-spin'/>
                    :
                        <FaLightbulb/>
                    }
                </button>
                <button 
                    className={classNames(
                        'bg-black border p-3 text-white rounded hover:bg-gray-800 hover:ring-2 ring-black transition-all duration-300',
                        "disabled:bg-gray-700"
                    )}
                    onClick={handleReset}
                >
                    <FiRotateCcw/>
                </button>
            </div>
        </div>
    )
}
