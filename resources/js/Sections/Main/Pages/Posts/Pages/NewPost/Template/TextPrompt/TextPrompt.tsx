import React, { useContext, useEffect } from 'react'
import { Input } from '<>';
import { classNames } from '@/Utils';
import { Context } from '../../Context/Context';
import { useQuery } from 'react-query';
import api from '@/Utils/api';
import { CgSpinnerTwoAlt, FaLightbulb } from 'react-icons/all';

export default function TextPrompt() {
    const {state, dispatch} = useContext(Context)
    const { isFetching, data, refetch } = useQuery(
        "getTitleResult", 
        async () => await api.post('/api/getTitleResult', {value: state.titlePrompt}),
        {
            enabled: false,
            retry:false,
        }
    )
    const handleClick = () => {
        refetch()
    }
    useEffect(() => {
      dispatch({type:"setTitleResult", payload: data?.data.result})
    }, [data])
    
    return (
        <div className='flex w-full gap-4 items-end'>
            <Input
                name="title"
                label="Prompt do titulo"
                placeholder='Digite o prompt do titulo, a ser passado para a IA'
                onChange={(e)=>dispatch({type:"setTitlePrompt", payload:e.target.value})}
                value={state.titlePrompt}
            />
            <div className='h-full pt-7'>
            <button 
                className={classNames(
                    'bg-black h-full border p-3 text-white rounded hover:bg-gray-800 hover:ring-2 ring-black transition-all duration-300',
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
