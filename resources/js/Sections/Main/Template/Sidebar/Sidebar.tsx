import { useContext } from 'react';
import {classNames} from '@/Utils/index';
import RootContext from '../../Contexts/RootContext';

export default function Sidebar() {
  const { state:{sidebar}, dispatch } = useContext(RootContext);
  console.log(sidebar);
  return (
    <aside className={classNames(
      "bg-black h-screen absolute w-64 transition-[margin] shadow-lg shadow-gray-900",
      sidebar?"-ml-0":"-ml-52"
      )}>
      <header className={classNames(
        'p-3 text-2xl flex text-white',
        sidebar?"justify-between":"justify-center w-12 ml-auto"
        )}>

        {sidebar ?
        (
          <>
            <span>SARA</span>
            <button onClick={()=>dispatch({type: "close"})}>{"<"}</button>
          </>
        )
          :
        (
          <button onClick={()=>dispatch({type: "open"})}>{">"}</button>
        )
        }
      </header>
    </aside>
  );
}
