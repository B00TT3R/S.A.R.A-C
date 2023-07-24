import { SiOpenai } from 'react-icons/si';
import { useQuery } from 'react-query';
import {PageSpinner, Square} from '<>';
import api from '@/Utils/api';

export default function Generations() {
    const {data, isLoading, isFetching} = useQuery('generationCount', async ()=> await api.get("api/generationCount"))
    return (
        
        <Square
            title={
                <>
                    <SiOpenai className='text-green-600'/>
                    <span className=''>Gerações</span>
                </>
            }
            to="geracoes"
        >
            {
                isFetching?<PageSpinner size='text-5xl'/>:(
                    <>
                        <span><b>Total</b>: {data?.data.total}</span>
                        <span><b>Gerações de imagem</b>: {data?.data.image}</span>
                        <span><b>Gerações de texto</b>: {data?.data.text}</span>
                    </>
                )
            }
        </Square>
    )
}
