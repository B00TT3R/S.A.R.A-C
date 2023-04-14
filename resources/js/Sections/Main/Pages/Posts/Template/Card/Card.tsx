import { classNames } from '@/Utils'
import { Link } from 'react-router-dom'
import post from '../../Types/post'
interface props{
    post: post
}
export default function Card({post}:props) {
  return (
    <li
        className={
        classNames(
            'cursor-pointer w-full bg-white border-2 p-3 rounded-sm hover:brightness-95 ',
            "hover:shadow-inner transition-all shadow-md",
            "shadow-gray-100",
        )
    }>
        <Link to={post.id.toString()} className="w-full h-full grid content-start">
          <span><b>Tipo:</b> {post.type}</span>
          <span><b>ID:</b> {post.id}</span>
          <span><b>Post_Id:</b> {post.response.id}</span>
        </Link>
    </li>
  )
}
