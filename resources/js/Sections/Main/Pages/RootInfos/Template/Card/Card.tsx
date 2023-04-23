import { classNames } from '@/Utils'
import { Link, useNavigate } from 'react-router-dom'
import rootInfo from '../../Types/rootInfo'
import { MdModeEditOutline, RxCrossCircled } from 'react-icons/all'
import api from '@/Utils/api'
interface props{
    rootinfo: rootInfo
    onDelete?: ()=>void
}
export default function Card({rootinfo, onDelete}:props) {
  const {id} = rootinfo;
  const navigate = useNavigate()
  const handleDelete = async () =>{
    if(window.confirm(`Deseja realmente deletar a informação ${id}?`)){
      await api.delete(`/api/rootInfos/${id}`)
      onDelete && onDelete()
    }
  }
  const handleEdit = async () => {
    navigate(`/inforaiz/editar/${id}`)
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
        <Link to={rootinfo.id.toString()} className="w-full h-full grid content-start">
          <span><b>Tipo:</b> {rootinfo.type == "image"?"Imagem":"Texto"}</span>
          <span><b>Informação:</b> {rootinfo.info}</span>
          <span><b>ID:</b> {rootinfo.id}</span>
        </Link>
        <div className='flex gap-1'>
          <MdModeEditOutline
            className={
              classNames(
                "text-2xl ring-gray-300 rounded-full transition-all text-red-700 hover:text-red-900 hover:ring-4",
              )
            }
            onClick={handleEdit}
          />
        </div>
        <div className='flex gap-1'>
          <RxCrossCircled
            className={
              classNames(
                "text-2xl ring-gray-300 rounded-full transition-all text-red-700 hover:text-red-900 hover:ring-4",
              )
            }
            onClick={handleDelete}
          />
        </div>
    </li>
  )
}
