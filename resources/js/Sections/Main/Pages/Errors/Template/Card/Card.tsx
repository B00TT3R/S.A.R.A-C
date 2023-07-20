import { classNames } from '@/Utils'
import { Link } from 'react-router-dom'
import error from '../../Types/error'
import { CardWrapper } from '<>'
interface props{
    error: error
}
export default function Card({error}:props) {
  return (
    <CardWrapper to={error.id.toString()}>
      <span><b>Tipo:</b> {error.type}</span>
      <span><b>ID:</b> {error.id}</span>
    </CardWrapper>
  )
}
