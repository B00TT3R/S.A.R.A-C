import { classNames } from "@/Utils"
import { Link } from "react-router-dom"

interface props{
    children: React.ReactNode
    outerChild?: React.ReactNode
    to: string
    className?: string
}
const CardWrapper = ({children, to, outerChild, className, ...rest}:props) =>{
    return(
        <li
            className={
                classNames(
                    'cursor-pointer w-full border-2 p-3 rounded-sm',
                    "hover:shadow-inner transition-all shadow-md",
                    "shadow-gray-100 bg-white hover:brightness-95",
                    "dark:shadow-none dark:bg-slate-900 dark:border-slate-800 hover:brightness-110",
                    className || ""
                )
            }
            {...rest}
        >
            <Link to={to} className="w-full h-full grid content-start">
                {children}
            </Link>
            {outerChild}
        </li>
    )
}
export default CardWrapper