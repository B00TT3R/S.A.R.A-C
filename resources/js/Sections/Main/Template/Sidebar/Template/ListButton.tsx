import RootContext from '@/Sections/Main/Contexts/RootContext';
import { classNames } from '@/Utils'
import {useContext, useEffect, useState} from 'react'
import { IconType } from 'react-icons/lib'
import { Link, useLocation } from 'react-router-dom';
interface props {
    Icon:IconType
    text: string,
    to: string
}
export default function ListButton({Icon, text, to}:props) {
    const {state:{sidebar}} = useContext(RootContext);
    const {pathname} = useLocation()
    
    return (
        <Link to={to} className={classNames(
            "text-white flex h-12 overflow-x-hidden group",
            "hover:bg-white hover:text-black transition-all",

            "flex items-center gap-2 whitespace-nowrap duration-300",
            sidebar?"p-3 ":"justify-center  w-12 hover:w-72 hover:justify-start hover:pl-4 shadow-md hover:bg-opacity-95 hover:border-r-2 hover:rounded-r-md",
            pathname===to?"bg-gray-200 text-gray-950":""
        )}
        >
            <Icon/>
            <span className={sidebar?"":"hidden group-hover:block"}>{text}</span>
        </Link>
    )
}
