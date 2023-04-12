import { classNames } from '@/Utils'
import StyleHashCase from './Utils/StyleHash'
import { Link } from 'react-router-dom'
import error from '../../Types/error'
interface props{
    error: error
}
export default function Card({error}:props) {
  return (
    <li
        className={
        classNames(
            'cursor-pointer w-full bg-white border-2 p-3 rounded-sm hover:brightness-95 ',
            "hover:shadow-inner transition-all shadow-md",
            "shadow-gray-100",
            StyleHashCase(error.type).wrapper,
        )
    }>
        <Link to={error.id.toString()} className="w-full h-full grid content-start">
        <span><b>Tipo:</b> {error.type}</span>
        <span><b>ID:</b> {error.id}</span>
        </Link>
    </li>
  )
}
