import { useContext } from 'react';
import { FaGithub, FaHome, BiErrorAlt, SiOpenai, FaFacebook, FaUserAlt, AiOutlineInfoCircle, BsInfoCircleFill, TbInfoSquare } from 'react-icons/all'
import { Link } from 'react-router-dom';

import { classNames } from '@/Utils/index';
import RootContext from '../../Contexts/RootContext';
import ListButton from './Template/ListButton';
export default function Sidebar() {
  const { state:{sidebar}, dispatch } = useContext(RootContext);
  const toggleSidebar = () => dispatch({type: 'toggle'});
  
  return (
    <aside className={classNames(
      "bg-black transition-[width] duration-300 shadow-md shadow-gray-400 z-10",
      "flex flex-col h-screen absolute",
      sidebar?"sm:w-72 w-screen":"w-12"
    )}>
      <header className={classNames(
        'text-3xl flex text-white transition-all duration-300',
        "shadow-sm shadow-gray-600 group",
        "items-center h-14 box-border",
        sidebar?`justify-between pl-2`
        :`
          justify-center sm:w-14 bg-black hover:w-20 hover:bg-opacity-90 hover:rounded-r-md hover:shadow-md
        `
      )}>
        <Link to="/"
          className={classNames(
            'hover:underline',
            sidebar?"block":"hidden"
          )}
        >
          S.A.R.A
        </Link>
        <button 
          onClick={toggleSidebar}
          className={classNames(
            "hover:bg-white hover:text-black transition-colors h-full",
            sidebar?"w-14":"w-full"
          )}
          
        >
          {sidebar?"<":">"}
        </button>
      </header>
      
      <ListButton
        Icon={FaHome}
        text="Home"
        to="/"
        iconClass='group-hover:text-black'
        iconClassOnActive="text-black"
      />
      <ListButton
        Icon={FaFacebook}
        text="Posts"
        to="/posts"
        iconClass='group-hover:text-blue-600'
        iconClassOnActive="text-blue-600"
        permission='posts'
      />
      <ListButton
        Icon={BiErrorAlt}
        text="Erros"
        to="/erros"
        iconClass='group-hover:text-red-500'
        iconClassOnActive="text-red-500"
        permission='errors'
      />
      <ListButton
        Icon={SiOpenai}
        text="Gerações"
        to="/geracoes"
        iconClass='group-hover:text-green-500'
        iconClassOnActive="text-green-500"
        permission='generations'
      />
      <ListButton
        Icon={TbInfoSquare}
        text="Informações Raiz"
        to="/inforaiz"
        iconClass='group-hover:text-fuchsia-500'
        iconClassOnActive="text-fuchsia-500"
        permission='view_users'
      />
      <ListButton
        Icon={FaUserAlt}
        text="Usuários"
        to="/usuarios"
        iconClass='group-hover:text-blue-500'
        iconClassOnActive="text-blue-500"
        permission='view_users'
      />
      <footer className='mt-auto'>
        <ListButton
          Icon={FaGithub}
          text="Link no Github"
          to="https://github.com/B00TT3R/S.A.R.A"
          iconClass='group-hover:text-green-500'
          iconClassOnActive="text-green-500"
        />
      </footer>
    </aside>
  );
}
