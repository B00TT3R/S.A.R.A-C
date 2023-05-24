import { PageSpinner } from "@/Components"
import api from "@/Utils/api"
import { useQuery } from "react-query"
import { FacebookEmbed } from "react-social-media-embed"

export default function LastPost(){
    const {data, isFetching} = useQuery('lastPost', async ()=>await api.get("api/posts/last"))
    return(
        <>
            {isFetching
            ?
                <PageSpinner/>
            :
                <FacebookEmbed url={data?.data.url}/>
            }
        </>
    )   
}