import generation from '../../Types/generation'
import { CardWrapper } from '@/Components'
interface props{
    error: generation
}
export default function Card({error}:props) {
  return (
    <CardWrapper to={"geracao/"+error.id}>
      <span><b>Tipo:</b> {error.type}</span>
          <span><b>Tipo de geração:</b> {error.gen_type=="image"?"Imagem":"Texto"}</span>
          <span><b>ID:</b> {error.id}</span>
    </CardWrapper>
  )
}
