import RootContext from '@/Sections/Main/Contexts/RootContext';
import { classNames } from '@/Utils'
import {ReactPropTypes, useContext, useEffect, useState} from 'react'
import { IconType } from 'react-icons/lib'
import { Link, useLocation } from 'react-router-dom';
import Tailwind from 'tailwindcss'

interface props {
    Icon:IconType
    text: string
    to: string
    
    iconClass?: string
    className?: string
    rest?: React.ComponentPropsWithoutRef<typeof Link>
}
export default function ListButton({Icon, text, to, iconClass="", className="", ...rest}:props) {
    const {state:{sidebar}} = useContext(RootContext);
    const {pathname} = useLocation()
    
    return (
        <Link to={to} className={classNames(
            " flex w-full h-12 overflow-x-hidden group",
            "hover:bg-white hover:text-black transition-all",
            "flex items-center gap-2 whitespace-nowrap duration-300",
            className,
            sidebar?"p-3 ":`justify-center w-12
                hover:w-72 hover:justify-start hover:pl-4 shadow-md hover:bg-opacity-90 hover:border-r-2 hover:rounded-r-md
            `,
            pathname===to?"bg-gray-200 text-gray-950":"text-white"
        )}
        {...rest}
        >
            <Icon className={iconClass}/>
            <span className={sidebar?"":"hidden group-hover:block"}>{text}</span>
        </Link>
    )
}
