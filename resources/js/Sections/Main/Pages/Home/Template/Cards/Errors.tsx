import { BiErrorAlt } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { PageSpinner, Square } from '<>';
import api from '@/Utils/api';

export default function Errors() {
    const {data, isLoading, isFetching} = useQuery('errorCount', async ()=>await api.get("api/errorCount"))
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
