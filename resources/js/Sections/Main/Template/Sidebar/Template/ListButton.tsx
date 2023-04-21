import RootContext from '../../../Contexts/RootContext';
import { classNames } from '@/Utils'
import {useContext} from 'react'
import { IconType } from 'react-icons/lib'
import { Link, useLocation } from 'react-router-dom';

interface props {
    Icon:IconType
    text: string
    to: string
    permission?: string
    iconClass?: string
    iconClassOnActive?: string
    className?: string
    rest?: React.ComponentPropsWithoutRef<typeof Link>
}
export default function ListButton({Icon, text, to, permission=undefined, iconClass="", iconClassOnActive="", className="", ...rest}:props) {
    const {state:{sidebar}} = useContext(RootContext);
    const {pathname} = useLocation()
    const permissions:{[key:string]:any} = JSON.parse(localStorage.getItem('permissions') as string);
    const isAllowed = (!permission || permissions.includes(permission)) || permissions.includes("*")
    
    return (
        <Link to={to} className={classNames(
            "flex w-full h-12 overflow-x-hidden group",
            "hover:bg-white hover:text-black transition-all",
            "flex items-center gap-2 whitespace-nowrap duration-300",
            sidebar?"p-3 ":`justify-center w-12
            hover:w-72 hover:justify-start hover:pl-4 shadow-md hover:bg-opacity-90 hover:border-r-2 hover:rounded-r-md
            `,
            className,
            pathname===to?"bg-gray-200 text-gray-950":"text-white",
            isAllowed ? "" : "hidden"
        )}
        {...rest}
        >
            <Icon className={classNames(
                iconClass,
                pathname===to?iconClassOnActive:"")
            }/>
            <span className={sidebar?"":"hidden group-hover:block"}>{text}</span>
        </Link>
    )
}
