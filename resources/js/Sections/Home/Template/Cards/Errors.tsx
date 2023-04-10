import React from 'react'
import Square from '../Square/Square'
import { BiErrorAlt } from 'react-icons/all';
import { useQuery } from 'react-query';
import axios from 'axios';
import PageSpinner from '<>/PageSpinner/PageSpinner';

export default function Errors() {
    const {data, isLoading, isFetching} = useQuery('errorCount', async ()=>await axios.get("api/errorCount"))
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
                isFetching?<PageSpinner size='text-5xl'/>:(
                    <>
                        <span><b>Total</b>: {data!.data.total}</span>
                        {Object.keys(data!.data.types).map((type:any) =>(
                            <div key={type}>
                                <b>{type}:</b> {data!.data.types[type]}
                            </div>
                        ))}
                    </>
                )
            }
        </Square>
    )
}
