import { PageSpinner } from '@/Components'
import { classNames } from '@/Utils'
import api from '@/Utils/api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
interface props{
    onFinish?:()=>{}
}
export default function GenerateButton({onFinish}:props){
    const {id} = useParams()
    const {data, isFetching, refetch} = useQuery("generateByTopic", async ()=>await api.post(`/api/topics/${id}/post/shoot`),
    {
        enabled: false
    })
    const handleGeneration = async() =>{
        await refetch()
        onFinish && onFinish()
    }

    return(
        <button onClick={handleGeneration} className={
            classNames(
                "ml-auto",
                "transition-colors rounded-md p-2 mt-auto",
                "bg-black hover:bg-gray-700",
                "dark:bg-white dark:hover:bg-gray-300 text-white dark:text-black"
            )
        }>
            {
            isFetching
            ?
                <PageSpinner size="text-xl"/>
            :
                "Gerar Novo"
            }
        </button>
    )
}