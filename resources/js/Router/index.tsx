import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from '@/Sections/Home/Home'
import Template from '@/Sections/Home/Template/Template' //mudar a localização disso aqui depois!
import Errors from '@/Sections/Errors/Errors';
import axios from 'axios';


const router = createBrowserRouter([
    {
        element: <Template />,
        children: [
            {
                element: <Home />,
                path: '/'
            },
            {
                element: <Errors />,
                path: '/erros'
            },
        ]
    },
]);
export default router;