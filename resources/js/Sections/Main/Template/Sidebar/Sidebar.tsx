import { useContext } from 'react';
import {classNames} from '@/Utils/index';
import RootContext from '../../Contexts/RootContext';
import { FaGithub, FaHome} from 'react-icons/fa'
import { BiErrorAlt} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import ListButton from './Template/ListButton';
export default function Sidebar() {
  const { state:{sidebar}, dispatch } = useContext(RootContext);
  return (
    <aside className={classNames(
      "bg-black h-screen absolute  transition-[width] duration-300 shadow-md shadow-gray-400",
      "flex flex-col",
      sidebar?"sm:w-72 w-screen":"w-12"
      )}>
      <header className={classNames(
        'text-3xl flex text-white transition-all',
        "border-b border-gray-700",
        "items-center h-14 box-border",
        sidebar?"justify-between pl-2":"justify-center w-14 bg-black shadow-sm shadow-gray-400"
      )}>

        {sidebar ?
          (
            <>
              <Link to="/">S.A.R.A</Link>
              <button 
                onClick={()=>dispatch({type: "close"})}
                className="hover:bg-white hover:text-black transition-colors h-full w-16"
                
              >
                  {"<"}
              </button>
            </>
          )
            :
          (
            <button
              onClick={()=>dispatch({type: "open"})}
              className="hover:bg-white hover:text-black transition-colors flex-1 h-full"
            >
              {">"}
            </button>
          )
        }
      </header>
      <ListButton
        Icon={FaHome}
        text="Home"
        to="/"
      />
      <ListButton
        Icon={BiErrorAlt}
        text="Erros"
        to="/erros"
      />
      <footer className={classNames(
        "text-white mt-auto flex w-full h-12 overflow-x-hidden",
        "hover:bg-white hover:text-black transition-colors"
      )}
      >
        <a
          href="https://github.com/B00TT3R/S.A.R.A"
          className={classNames(
            'flex-1 flex items-center gap-2 whitespace-nowrap justify-start transition-all',
            sidebar?"p-3":"justify-center"
          )}
        >
          <FaGithub/>
          <span className={sidebar?"":"hidden"}>Link no Github</span>
        </a>
      </footer>
    </aside>
  );
}
