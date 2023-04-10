import React from 'react'
import Square from '../Square/Square'
import { SiOpenai } from 'react-icons/all';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Errors() {
    const {data, isLoading} = useQuery('generationCount', async ()=> await axios.get("api/generationCount"))
    return (
        
        <Square
            title={
                <>
                    <SiOpenai className='text-green-600'/>
                    <span className=''>Gerações</span>
                </>
            }
            to="erros"
        >
            {
                isLoading?"carregando":(
                    <>
                        <span><b>Total</b>: {data?.data.total}</span>
                        <span><b>Gerações de imagem:</b>: {data?.data.image}</span>
                        <span><b>Gerações de texto:</b>: {data?.data.text}</span>
                        
                    </>
                )
            }
        </Square>
    )
}
