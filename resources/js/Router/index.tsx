import {lazy} from 'react';
import { createBrowserRouter } from "react-router-dom";
import {PageLoader} from '<>'

import Template from '@/Sections/Main/Template/Template'
const NotFound = lazy(()=>import("@/Sections/NotFound/NotFound"))
const Logout = lazy(()=>import("@/Sections/Logout/Logout"))
const Login = lazy(()=>import("@/Sections/Login/Login"))
const Home = lazy(()=>import("&/Home/Home"))
const Errors = lazy(()=>import("&/Errors/Errors"))
const Users = lazy(()=>import("&/Users/Users"));
const NewUser = lazy(()=>import("&/Users/Pages/NewUser/NewUser"))
const ViewUser = lazy(()=>import("&/Users/Pages/ViewUser/ViewUser"))
const ViewError = lazy(()=>import("&/Errors/Pages/ViewError/ViewError"))
const Generations = lazy(()=>import("&/Generations/Generations"))
const ViewGeneration = lazy(()=>import("&/Generations/Pages/ViewGeneration/ViewGeneration"))
const Posts = lazy(()=>import("&/Posts/Posts"))
const ViewPost = lazy(()=>import("&/Posts/Pages/ViewPosts/ViewPosts"))
const NewPost = lazy(()=>import("&/Posts/Pages/NewPost/NewPost"))


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
            {
                path: 'posts',
                children: [
                    {
                        element: <PageLoader Element={Posts}/>,
                        index:true,
                    },
                    {
                        element: <PageLoader Element={NewPost}/>,
                        path: 'novo',
                    },
                    {
                        element: <PageLoader Element={ViewPost}/>,
                        path: ':id',
                    },
                ]
            },
            {
                path: 'usuarios',
                children: [
                    {
                        element: <PageLoader Element={Users}/>,
                        index:true,
                    },
                    {
                        element: <PageLoader Element={NewUser}/>,
                        path: 'novo',
                    },
                    {
                        element: <PageLoader Element={ViewUser}/>,
                        path: ':id',
                    },
                ]
            },
        ]        
    },
    {
        path:'login',
        element: <PageLoader Element={Login}/>
    },
    {
        path:'logout',
        element: <PageLoader Element={Logout}/>
    },
    {
        element: <PageLoader Element={NotFound}/>,
        path: '*'
    }
]);
export default router;