import { RxCrossCircled } from 'react-icons/rx'
import { classNames } from '@/Utils'
import api from "@/Utils/api"
import { CardWrapper } from '<>'
import post from '../../Types/post'
import { useParams } from 'react-router-dom'
interface props{
    post: post
    onDelete: ()=>void
    isDeleting?: (val:boolean)=>void
}
export default function Card({post, onDelete, isDeleting}:props) {
  const {id:postid} = post
  const {id} = useParams()
  const handleDelete = async () =>{
    if(window.confirm(`Deseja realmente deletar o post ${postid}?`)){
      isDeleting && isDeleting(true)
      await api.delete(`/api/topics/${id}/post/${postid}`)
      isDeleting && isDeleting(false)
      onDelete && onDelete()
    }
  }  
  return(
    <CardWrapper 
      to={"post/"+post.id}
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
