import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from '@/Sections/Main/Main'
import Template from '@/Sections/Main/Template/Template'
import Errors from '@/Sections/Errors/Errors';


const router = createBrowserRouter([
    {
        element: <Template />,
        children: [
            {
                element: <Main />,
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