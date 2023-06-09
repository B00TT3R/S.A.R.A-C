import React, {useContext} from 'react'
import RootContext from '../../Contexts/RootContext';
import { classNames } from '@/Utils';
import { FaSignOutAlt, FaUser, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(RootContext);
    if(!localStorage.getItem('permissions')){
        navigate("/login")
    }
    const permissions = localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions') as string) : [];
    const canSeeItself = permissions.includes("view_user") || permissions.includes("*")
    
    const handleUserClick = () =>{
        if(canSeeItself){
            navigate(`usuarios/${localStorage.getItem("userId")}`)
        }
    }
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
                <button 
                    className={
                        classNames(
                            'flex w-full items-center gap-2 bg-gray-100 p-2 hover:brightness-95 transition-all',
                            canSeeItself?"cursor-pointer":"cursor-default"
                        )
                    }
                    onClick={handleUserClick}
                >
                    <FaUser />                
                    {localStorage.getItem("userName")}
                </button>
            </div>
            <div>
                <Link to="/logout" className='flex items-center gap-2 p-2 bg-gray-100 hover:brightness-95 transition-all'>
                    <FaSignOutAlt/>
                    Deslogar
                </Link>
            </div>
            <button 
                className='absolute top-full bg-black text-white px-4 rounded-b -translate-x-1/2 left-1/2 text-xl h-5 sm:h-6 flex items-center hover:bg-gray-700'
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
