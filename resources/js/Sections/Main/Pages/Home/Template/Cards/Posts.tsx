import Square from '../Square/Square'
import { FaFacebook } from 'react-icons/fa';
import { useQuery } from 'react-query';
import {PageSpinner} from '<>';
import api from '@/Utils/api';
import {DateFormatter} from "@/Utils"

export default function Posts() {
    const {data, isLoading, isFetching} = useQuery('postCount', async ()=> await api.get("api/postCount"))
    return (
        
        <Square
            title={
                <>
                    <FaFacebook className='text-blue-600'/>
                    <span className=''>Posts</span>
                </>
            }
            to="posts"
        >
            {
                isFetching?<PageSpinner size='text-5xl'/>:(
                    <>
                        <span><b>Total</b>: {data?.data.total}</span>
                        <span><b>Ultima criação:</b>: {data?.data.last?DateFormatter(data?.data.last):"sem posts"}</span>
                        
                    </>
                )
            }
        </Square>
    )
}
