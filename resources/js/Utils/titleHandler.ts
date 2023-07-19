import {useEffect} from 'react'
const prefix = "S.A.R.A-C"
export default function titleHandler(title:string, useRoot = true):void {
    useEffect(() => {
        if (useRoot) {
            document.title =  prefix + " - " + title;
        }
        else{
            document.title = title
        }
        
        return () => {
            document.title = prefix
        }

    },[])
    
}