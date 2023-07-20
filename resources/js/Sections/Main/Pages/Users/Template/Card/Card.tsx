import { classNames } from '@/Utils'
import api from '@/Utils/api'
import { useNavigate } from 'react-router-dom'
import user from '../../Types/user'
import { MdModeEditOutline} from 'react-icons/md'
import { RxCrossCircled } from 'react-icons/rx'
import { CardWrapper } from '<>'

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
    if(!thisUser){
      navigate(`/usuarios/editar/${id}`)

    }
  }

  return(
    <CardWrapper to={user.id.toString()} 
      className='flex gap-1 justify-around items-center'
      outerChild={
        <>
          <div className='flex gap-1'>
            <MdModeEditOutline
              className={
                classNames(
                  "text-2xl ring-gray-300 dark:ring-slate-600 rounded-full transition-all",
                  thisUser ? "text-gray-400":"text-red-700 hover:ring-4"
                )
              }
              onClick={handleEdit}
            />
          </div>
          <div className='flex gap-1'>
            <RxCrossCircled
              className={
                classNames(
                  "text-2xl ring-gray-300 dark:ring-slate-600 rounded-full transition-all",
                  thisUser ? "text-gray-400":"text-red-700 hover:text-red-900 hover:ring-4"
                )
              }
              onClick={handleDelete}
            />
          </div>
        </>
      }
    >
      <span><b>Nome:</b> {user.name}</span>
      <span><b>E-Mail:</b> {user.email}</span>
      <span><b>ID:</b> {user.id}</span>
    </CardWrapper>
  )
}
