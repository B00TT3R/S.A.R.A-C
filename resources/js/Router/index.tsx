import {lazy} from 'react';
import { createBrowserRouter } from "react-router-dom";
import {PageLoader} from '<>'

import Template from '@/Sections/Home/Template/Template' //mudar a localização disso aqui depois!
import NotFound from '@/Sections/NotFound/NotFound';
const Home = lazy(()=>import("@/Sections/Home/Home"));
const Errors = lazy(()=>import("@/Sections/Errors/Errors"));

const router = createBrowserRouter([
    {
        element: <Template />,
        children: [
            {
                element: <PageLoader Element={Home}/>,
                path: '/'
            },
            {
                element: <PageLoader Element={Errors}/>,
                path: '/erros'
            },
        ]        
    },
    {
        element: <NotFound/>,
        path: '*'
    }

]);
export default router;