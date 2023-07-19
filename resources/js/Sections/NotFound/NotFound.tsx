import { classNames } from '@/Utils'
import { Link } from 'react-router-dom'
import { titleHandler } from '@/Utils'

export default function NotFound() {
  titleHandler("Não Encontrado!")
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center p-2 text-center'>
        <h1 style={{textShadow:"0px 4px 7px grey"}} className='text-9xl'>404</h1>
        <h3 className='text-xl'>Essa página não foi encontrada, por favor verifique a URL</h3>
        <Link 
            className={classNames(
                "bg-black text-white px-3 py-2 text-xl rounded-md mt-4 shadow-md shadow-gray-400 border border-gray-500",
                "hover:bg-gray-700 transition-all"
            )} 
            to="/"
        >
            Home
        </Link>
    </section>
  )
}
