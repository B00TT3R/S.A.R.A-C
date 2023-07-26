import {Square} from "<>";
import topic from "../../Types/topic";
import { RxCrossCircled } from "react-icons/rx";
import api from "@/Utils/api";

interface props{
    topic:topic
    onDelete?:()=>{}
}
export default function Card({topic, onDelete}:props){
    const handleDelete=async()=>{
        if(window.confirm("Tem certeza que deseja deletar este tópico?"))
            await api.delete(`/api/topics/${topic.id}`)
            onDelete && onDelete()
    }
    return(
        <Square
            title={
            <div className="flex justify-between w-full items-center text-2xl">
                {topic.name}
                <button onClick={(e)=>{handleDelete();e.stopPropagation()}} className="">
                    <RxCrossCircled className="text-red-950 dark:text-red-50 hover:text-red-500 hover:ring-red-700 hover:ring-2 ring-opacity-30 rounded-full transition-all"/>
                </button>
            </div>
            }
            to={topic.id.toString()}
            //className='aspect-square'
        >
            <span><b>Estilos de texto: </b>{topic.infos.text}</span>
            <span><b>Estilos de Imagem: </b>{topic.infos.image}</span>
            <span><b>Informações Raiz: </b>{topic.infos.textinfo}</span>
            <span><b>Posts Totais: </b>{topic.infos.total}</span>
            {/* <span><b>Ultima Geração: </b>{new Date().toLocaleString()}</span> */}
        </Square>
    )
}