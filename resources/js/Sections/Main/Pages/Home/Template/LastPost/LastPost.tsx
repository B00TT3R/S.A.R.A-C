import { PageSpinner } from "@/Components"
import api from "@/Utils/api"
import { useQuery } from "react-query"
import { FacebookEmbed, InstagramEmbed } from "react-social-media-embed"

export default function LastPost(){
    const {data, isFetching} = useQuery('lastPost', async ()=>await api.get("api/posts/last"))
    
    return(
        <>
            {isFetching
            ?
                <PageSpinner/>
            :
                data?.data.url == null 
                ?
                    <h1>Sem ultimo post!</h1>
                :
                data?.data.type == "facebook"
                ?
                    <FacebookEmbed url={data?.data.url}/>
                :
                    <InstagramEmbed url={data?.data.url}/>

            }
        </>
    )   
}