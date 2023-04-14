import React, {useContext} from 'react'
import RootContext from '../../Contexts/RootContext';
import { classNames } from '@/Utils';
import { FaSignOutAlt, FaUser, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';

export default function Menu() {
    const { state, dispatch } = useContext(RootContext);
  return (
    <div
        className={classNames(
            "absolute  left-1/2 -translate-x-1/2",
            "sm:left-auto sm:-translate-x-0 sm:right-2",
            "border bg-gray-100 w-80  z-10 rounded-b-md",
            "flex flex-col group",
            "text-2xl transition-all",
            state.menu?"shadow-md":"-translate-y-full",
        )}
        id="menu"
    >
        <div>
            <div className='flex items-center gap-2 bg-gray-100 p-2 hover:brightness-95 transition-all'>
                <FaUser />                
                {localStorage.getItem("userName")}
            </div>
        </div>
        <div>
            <Link to="/logout" className='flex items-center gap-2 p-2 bg-gray-100 hover:brightness-95 transition-all'>
                <FaSignOutAlt/>
                Deslogar
            </Link>
        </div>
        <button 
            className='absolute top-full bg-black text-white px-3 rounded-b -translate-x-1/2 left-1/2 text-xl h-4 flex items-center hover:bg-gray-700'
            onClick={()=>dispatch({type:'toggleMenu'})}
        >
            {state.menu
            ?
                <RiArrowUpSLine/>
            :
                <RiArrowDownSLine/>
            }
        </button>
    </div>
  )
}
