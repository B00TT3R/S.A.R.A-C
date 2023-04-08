import { useContext } from 'react';
import {classNames} from '@/Utils/index';
import RootContext from '../../Contexts/RootContext';
import { Link } from 'react-router-dom';
export default function Sidebar() {
  const { state:{sidebar}, dispatch } = useContext(RootContext);
  console.log(sidebar);
  return (
    <aside className={classNames(
      "bg-black h-screen absolute  transition-[width] duration-300 shadow-md shadow-gray-900",
      sidebar?"w-64":"w-12"
      )}>
      <header className={classNames(
        'text-3xl flex text-white transition-all',
        "border-b border-gray-700",
        "items-center h-12 box-border",
        sidebar?"justify-between":"justify-center w-16 bg-black "
      )}>

        {sidebar ?
        (
          <>
            <Link to="/">S.A.R.A.</Link>
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
    </aside>
  );
}
