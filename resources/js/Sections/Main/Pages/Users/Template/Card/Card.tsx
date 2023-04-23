import { classNames } from '@/Utils'
import StyleHashCase from './Utils/StyleHash'
import { Link, useNavigate } from 'react-router-dom'
import user from '../../Types/user'
import { AiFillEdit, BiEditAlt, MdModeEditOutline, RxCrossCircled } from 'react-icons/all'
import api from '@/Utils/api'
interface props{
    user: user
    onDelete?: ()=>void
}
export default function Card({user, onDelete}:props) {
  const {id} = user;
  const navigate = useNavigate()
  const thisUser = user.id == parseInt(localStorage.getItem("userId") as string)
  const handleDelete = async () =>{
    if(!thisUser && window.confirm(`Deseja realmente deletar o usuário ${id}?`)){
      await api.delete(`/api/users/${id}`)
      onDelete && onDelete()
    }
  }
  const handleEdit = async () => {
    navigate(`/usuarios/editar/${id}`)
  }
  return (
    <li
        className={
        classNames(
            'cursor-pointer w-full bg-white border-2 p-3 rounded-sm hover:brightness-95 ',
            "hover:shadow-inner transition-all shadow-md",
            "shadow-gray-100 flex gap-1 justify-around items-center",
        )
    }>
        <Link to={user.id.toString()} className="w-full h-full grid content-start">
          <span><b>Nome:</b> {user.name}</span>
          <span><b>E-Mail:</b> {user.email}</span>
          <span><b>ID:</b> {user.id}</span>
        </Link>
        <div className='flex gap-1'>
          <MdModeEditOutline
            className={
              classNames(
                "text-2xl ring-gray-300 rounded-full transition-all",
                thisUser ? "text-gray-400":"text-red-700 hover:text-red-900 hover:ring-4"
              )
            }
            onClick={handleEdit}
          />
        </div>
        <div className='flex gap-1'>
          <RxCrossCircled
            className={
              classNames(
                "text-2xl ring-gray-300 rounded-full transition-all",
                thisUser ? "text-gray-400":"text-red-700 hover:text-red-900 hover:ring-4"
              )
            }
            onClick={handleDelete}
          />
        </div>
    </li>
  )
}
