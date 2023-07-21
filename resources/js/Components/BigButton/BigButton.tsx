import { classNames } from "@/Utils"

interface props extends React.ComponentPropsWithoutRef<"button">{
    label?: string
    className?: string
}
export default function BigButton({label="Salvar", className="", ...rest}:props){
    return(
            <button
                className={classNames(
                    " p-2 hover:ring-2 ring-black transition-all duration-300 rounded",
                    "bg-black hover:bg-gray-800 text-white disabled:bg-gray-700",
                    "dark:bg-white dark:hover:bg-gray-300 dark:text-black dark:disabled:bg-gray-400",
                    className
                )}
                type="submit"
                {...rest}
            >
                {label}
            </button>
    )
}