import React from 'react'
import Square from '../Square/Square'
import { BiErrorAlt } from 'react-icons/all';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Errors() {
    const {data, isLoading} = useQuery('todos', async ()=>await axios.get("api/errorCount"))
    return (
        
        <Square
            title={
                <>
                    <BiErrorAlt className='text-red-500'/>
                    <span className=''>Erros</span>
                </>
            }
            to="erros"
        >
            {
                isLoading?"carregando":(
                    <>
                        <span><b>Total</b> = {data!.data.total}</span>
                        {Object.keys(data!.data.types).map((type:any) =>(
                            <div key={type}>
                                {type}: {data!.data.types[type]}
                            </div>
                        ))}
                    </>
                )
            }
        </Square>
    )
}
