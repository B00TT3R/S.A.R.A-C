import { classNames } from '@/Utils'
import { Link } from 'react-router-dom'
import generation from '../../Types/generation'
interface props{
    error: generation
}
export default function Card({error}:props) {
  return (
    <li
        className={
        classNames(
            'cursor-pointer w-full bg-white border-2 p-3 rounded-sm hover:brightness-95 ',
            "hover:shadow-inner transition-all shadow-md",
            "shadow-gray-100",
        )
    }>
        <Link to={error.id.toString()} className="w-full h-full grid content-start">
        <span><b>Tipo:</b> {error.type}</span>
        <span><b>Tipo de geração:</b> {error.gen_type=="image"?"Imagem":"Texto"}</span>
        <span><b>ID:</b> {error.id}</span>
        </Link>
    </li>
  )
}
