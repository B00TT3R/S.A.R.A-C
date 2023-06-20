import RootContext from '../../../Contexts/RootContext';
import { classNames } from '@/Utils'
import {useContext} from 'react'
import { IconType } from 'react-icons/lib'
import { Link, matchPath, useLocation } from 'react-router-dom';

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
    const permissions:{[key:string]:any} = localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions') as string) : [];
    const isAllowed = (!permission || permissions.includes(permission)) || permissions.includes("*")
    const isMatchedRoute = !!matchPath({ path: `/${to}`, end:false },location.pathname )
    

    
    return (
        <Link to={to} className={classNames(
            "flex w-full h-12 overflow-x-hidden group",
            "sm:hover:bg-white sm:hover:text-black transition-all shadow-md",
            "active:bg-white active:text-black",
            "flex items-center gap-2 whitespace-nowrap duration-300",
            sidebar?"p-3 ":
            `justify-center w-12
            sm:hover:w-72 sm:hover:justify-start sm:hover:pl-4 sm:hover:bg-opacity-90  sm:hover:bordr-r-2 sm:hover:rounded-r-sm 
            active:w-72 active:justify-start active:bg-opacity-90 active:borer-r-2 active:rounded-r-sm active:pl-4
            `,
            className,
            isMatchedRoute?"bg-gray-200 text-gray-950":"text-white",
            isAllowed ? "" : "hidden"
        )}
        {...rest}
        >
            <Icon className={classNames(
                iconClass,
                isMatchedRoute?iconClassOnActive:"")
            }/>
            <span className={sidebar?"":"hidden sm:group-hover:block group-active:block"}>{text}</span>
        </Link>
    )
}
