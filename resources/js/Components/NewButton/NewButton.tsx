import { classNames } from "@/Utils"
import { Link } from "react-router-dom"

interface props{
    to:string
}
const NewButton  = ({to}:props) =>{
    return(
        <Link to={to} className="ml-auto bg-red text-white flex flex-col">
            <div className={classNames(
                "transition-colors rounded-md p-2 mt-auto",
                "bg-black hover:bg-gray-700",
                "dark:bg-white dark:hover:bg-gray-300 text-white dark:text-black"
            )}>
                Novo
            </div>
        </Link>
    )
}
export default NewButton