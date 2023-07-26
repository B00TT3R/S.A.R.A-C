import api from "@/Utils/api"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { MdModeEditOutline } from "react-icons/md";

export default function Header(){
    const {id} = useParams();
    const {data,refetch, isFetching} = useQuery('getTopic',async ()=>await api.get(`/api/topics/raw/${id}`))
    const [inputValue, setInputValue] = useState(data?.data.name || "");

    useEffect(()=>{
        if(!isFetching)
            setInputValue(data?.data.name);
    },[isFetching])
    const handleInputChange = (event:any) => {
        setInputValue(event.target.value);
    }

    const handleEnterKey = async  (event:any) => {
        if (event.key === "Enter") {
            handleSubmit()
        }
    }

    const handleSubmit = async() =>{
        await api.patch(`/api/topics/${id}`, {
            name:inputValue
        })
        refetch()
        alert("Nome editado!")
    }

    return(
        <>
            {
            isFetching
            ?
                "Carregando..."
            :
                <div className="flex justify-between">
                    <input
                        value={inputValue}
                        className="!outline-none !border-none !ring-0 text-2xl p-0 bg-transparent"
                        onChange={handleInputChange}
                        onKeyDown={handleEnterKey}
                    />
                    {
                        (inputValue != "" && inputValue != data?.data.name)
                            ?
                            <button onClick={handleSubmit}>
                                <MdModeEditOutline/>
                            </button>
                            :
                                ""
                    }
                </div>
            }
        </>
    )
}