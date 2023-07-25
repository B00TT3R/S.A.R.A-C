import {Square} from "<>";
import topic from "../../Types/topic";

interface props{
    topic:topic
}
export default function Card({topic}:props){
    return(
        <Square
            title={topic.name}
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