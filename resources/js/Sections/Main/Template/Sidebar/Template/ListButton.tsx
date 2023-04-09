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
            "text-white flex w-full h-12 overflow-x-hidden",
            "hover:bg-white hover:text-black transition-colors",

            "flex items-center gap-2 whitespace-nowrap transition-all",
            sidebar?"p-3":"justify-center",
            pathname===to?"bg-gray-200 text-gray-950":""
        )}
        >
            <Icon/>
            <span className={sidebar?"":"hidden"}>{text}</span>
        </Link>
    )
}
