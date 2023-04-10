import {lazy, Suspense} from 'react';
import { createBrowserRouter } from "react-router-dom";
import Template from '@/Sections/Home/Template/Template' //mudar a localização disso aqui depois!
//import Errors from '@/Sections/Errors/Errors';
import axios from 'axios';
import PageLoader from '<>/PageLoader/PageLoader'
//import Home from '@/Sections/Home/Home'
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
]);
export default router;