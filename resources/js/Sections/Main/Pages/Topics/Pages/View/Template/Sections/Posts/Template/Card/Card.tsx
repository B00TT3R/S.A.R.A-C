import { RxCrossCircled } from 'react-icons/rx'
import { classNames } from '@/Utils'
import api from "@/Utils/api"
import { CardWrapper } from '<>'
import post from '../../Types/post'
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
  return(
    <CardWrapper 
      to={post.id.toString()}
      className="flex gap-1 justify-around items-center"
      outerChild={
        <div className='flex gap-1'>
            <RxCrossCircled
              className={
                classNames(
                  "text-2xl ring-gray-300 dark:ring-slate-600 rounded-full transition-all",
                  "text-red-700 hover:text-red-900 hover:ring-4"
                )
              }
              onClick={handleDelete}
            />
          </div>
      }
    >
      <span><b>Tipo:</b> {post.type}</span>
      <span><b>ID:</b> {post.id}</span>
      <span><b>Post_Id:</b> {post.response.id}</span>
    </CardWrapper>
  )
}
