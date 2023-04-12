import {lazy} from 'react';
import { createBrowserRouter } from "react-router-dom";
import {PageLoader} from '<>'

import Template from '@/Sections/Main/Template/Template' //mudar a localização disso aqui depois!
const NotFound = lazy(()=>import("@/Sections/NotFound/NotFound"));
const Home = lazy(()=>import("&/Home/Home"));
const Errors = lazy(()=>import("&/Errors/Errors"));
const ViewError = lazy(()=>import("&/Errors/Pages/ViewError/ViewError"));
const Generations = lazy(()=>import("&/Generations/Generations"));
const ViewGeneration = lazy(()=>import("&/Generations/Pages/ViewGeneration/ViewGeneration"));


const router = createBrowserRouter([
    {
        element: <Template />,
        path: '/',
        children: [
            {
                element: <PageLoader Element={Home}/>,
                index: true,
            },
            {
                path: 'erros',
                children: [
                    {
                        element: <PageLoader Element={Errors}/>,
                        index:true,
                    },
                    {
                        element: <PageLoader Element={ViewError}/>,
                        path: ':id',
                    },
                ]
            },
            {
                path: 'geracoes',
                children: [
                    {
                        element: <PageLoader Element={Generations}/>,
                        index:true,
                    },
                    {
                        element: <PageLoader Element={ViewGeneration}/>,
                        path: ':id',
                    },
                ]
            },
        ]        
    },
    {
        element: <PageLoader Element={NotFound}/>,
        path: '*'
    }
]);
export default router;