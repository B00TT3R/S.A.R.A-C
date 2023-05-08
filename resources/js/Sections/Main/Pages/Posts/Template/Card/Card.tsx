import { classNames } from '@/Utils'
import { Link } from 'react-router-dom'
import post from '../../Types/post'
import api from '@/Utils/api'
import { RxCrossCircled } from 'react-icons/rx'
interface props{
    post: post
    onDelete: ()=>void
    isDeleting?: (val:boolean)=>void
}
export default function Card({post, onDelete, isDeleting}:props) {
  const {id} = post
  const handleDelete = async () =>{
    if(window.confirm(`Deseja realmente deletar o post ${id}?`)){
      isDeleting && isDeleting(true)
      await api.delete(`/api/posts/${id}`)
      isDeleting && isDeleting(false)
      onDelete && onDelete()
    }
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
        <Link to={post.id.toString()} className="w-full h-full grid content-start">
          <span><b>Tipo:</b> {post.type}</span>
          <span><b>ID:</b> {post.id}</span>
          <span><b>Post_Id:</b> {post.response.id}</span>
        </Link>
        <div className='flex gap-1'>
          <RxCrossCircled
            className={
              classNames(
                "text-2xl ring-gray-300 rounded-full transition-all",
                "text-red-700 hover:text-red-900 hover:ring-4"
              )
            }
            onClick={handleDelete}
          />
        </div>
    </li>
  )
}
