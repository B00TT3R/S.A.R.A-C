import React, { useContext, useEffect, useState } from 'react'
import { Input } from '<>';
import { classNames } from '@/Utils';
import { Context } from '../../Context/Context';
import { useQuery } from 'react-query';
import api from '@/Utils/api';
import { CgSpinnerTwoAlt, FaLightbulb } from 'react-icons/all';

export default function TextPrompt() {
    const {state, dispatch} = useContext(Context)
    const [error, setError] = useState<undefined|string>()
    const { isFetching, data, refetch } = useQuery(
        "getTextResult", 
        async () => await api.post('/api/getTitleResult', {value: state.textPrompt}),
        {
            enabled: false,
            retry:false,
        }
    )
    const handleClick = () => {
        if (state.textPrompt.trim() !== '') {
            refetch()
        } else {
            setError("O valor não pode ser nulo")
        }
    }
    useEffect(() => {
      dispatch({type:"setTextResult", payload: data?.data.result})
    }, [data])
    useEffect(() => {
      dispatch({type:"setTextLoading", payload: isFetching})
    }, [isFetching])
    
    return (
        <div className='flex w-full gap-2 items-end'>
            <Input
                name="text"
                label="Prompt do titulo"
                placeholder='Digite o prompt do titulo, a ser passado para a IA'
                onChange={(e)=>dispatch({type:"setTextPrompt", payload:e.target.value})}
                value={state.textPrompt}
                error={error}
            />
            <div className='h-full pt-7'>
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
            </div>
        </div>
    )
}
