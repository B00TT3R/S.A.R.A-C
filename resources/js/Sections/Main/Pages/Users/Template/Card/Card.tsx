import { classNames } from '@/Utils'
import StyleHashCase from './Utils/StyleHash'
import { Link } from 'react-router-dom'
import user from '../../Types/user'
interface props{
    user: user
}
export default function Card({user}:props) {
  return (
    <li
        className={
        classNames(
            'cursor-pointer w-full bg-white border-2 p-3 rounded-sm hover:brightness-95 ',
            "hover:shadow-inner transition-all shadow-md",
            "shadow-gray-100",
        )
    }>
        <Link to={user.id.toString()} className="w-full h-full grid content-start">
        <span><b>Nome:</b> {user.name}</span>
        <span><b>E-Mail:</b> {user.email}</span>
        <span><b>ID:</b> {user.id}</span>
        </Link>
    </li>
  )
}
