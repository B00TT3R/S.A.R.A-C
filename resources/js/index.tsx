import router from './Router'
import {
    RouterProvider,
} from "react-router-dom";


const Main = () => {
    
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}
export default Main;