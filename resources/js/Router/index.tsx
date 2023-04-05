import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from '../Sections/Main/Main'
import Template from '../Sections/Main/Template/Template'


const router = createBrowserRouter([
    {
        element: <Template />,
        children: [
            {
                element: <Main />,
                path: '/'
            }
        ]
    },
]);
export default router;