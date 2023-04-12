import {lazy} from 'react';
import { createBrowserRouter } from "react-router-dom";
import {PageLoader} from '<>'

import Template from '@/Sections/Main/Template/Template' //mudar a localização disso aqui depois!
const NotFound = lazy(()=>import("@/Sections/NotFound/NotFound"));
const Home = lazy(()=>import("&/Home/Home"));
const Errors = lazy(()=>import("&/Errors/Errors"));

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
        element: <PageLoader Element={NotFound}/>,
        path: '*'
    }

]);
export default router;