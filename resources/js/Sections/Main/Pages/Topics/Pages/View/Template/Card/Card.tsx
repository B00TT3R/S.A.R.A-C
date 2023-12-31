import { classNames } from '@/Utils'
import { useNavigate, useParams } from 'react-router-dom'
import rootInfo from '../../../../Types/rootInfo'
import { MdModeEditOutline } from 'react-icons/md'
import { RxCrossCircled } from 'react-icons/rx'
import api from '@/Utils/api'
import InfoHash from './Utils/InfoHash'
import { CardWrapper } from '<>'
interface props{
    rootinfo: rootInfo
    onDelete?: ()=>void
}
export default function Card({rootinfo, onDelete}:props) {
  const {id:infoid} = rootinfo;
  const {id} = useParams()
  const navigate = useNavigate()
  const handleDelete = async () =>{
    if(window.confirm(`Deseja realmente deletar a informação ${infoid}?`)){
      await api.delete(`/api/topics/${id}/info/${infoid}`)
      onDelete && onDelete()
    }
  }
  const handleEdit = async () => {
    navigate(`info/editar/${infoid}`)
  }
  return(
    <CardWrapper
      to={"info/"+rootinfo.id}
      className='flex gap-1 justify-around items-center'
      outerChild={
        <>
          <div className='flex gap-1'>
            <MdModeEditOutline
              className={
                classNames(
                  "text-2xl rounded-full transition-all hover:ring-4",
                  "ring-gray-300 text-red-700 ",
                  "dark:ring-slate-600"
                )
              }
              onClick={handleEdit}
            />
          </div>
          <div className='flex gap-1'>
            <RxCrossCircled
              className={
                classNames(
                  "text-2xl rounded-full transition-all hover:ring-4",
                  "ring-gray-300 text-red-700",
                  "dark:ring-slate-600"
                )
              }
              onClick={handleDelete}
            />
          </div>
        </>
      }
    >
      <span><b>Tipo:</b> { InfoHash(rootinfo.type) }</span>
      <span><b>Informação:</b> {rootinfo.info}</span>
      <span><b>ID:</b> {rootinfo.id}</span>
    </CardWrapper>
  )
}
