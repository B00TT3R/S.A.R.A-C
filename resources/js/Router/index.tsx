import {Children, lazy} from 'react';
import { createBrowserRouter } from "react-router-dom";
import {PageLoader} from '<>'

import Template from '@/Sections/Main/Template/Template'
const NotFound = lazy(()=>import("@/Sections/NotFound/NotFound"))
const Logout = lazy(()=>import("@/Sections/Logout/Logout"))
const Login = lazy(()=>import("@/Sections/Login/Login"))

const Home = lazy(()=>import("&/Home/Home"))

const Errors = lazy(()=>import("&/Errors/Errors"))
const ViewError = lazy(()=>import("&/Errors/Pages/View/View"))

const Users = lazy(()=>import("&/Users/Users"));
const NewUser = lazy(()=>import("&/Users/Pages/New/New"))
const EditUser = lazy(()=>import("&/Users/Pages/Edit/Edit"))
const ViewUser = lazy(()=>import("&/Users/Pages/View/View"))

const Posts = lazy(()=>import("&/Posts/Posts"))
const ViewPost = lazy(()=>import("&/Posts/Pages/View/View"))
const NewPost = lazy(()=>import("&/Posts/Pages/New/New"))

const Generations = lazy(()=>import("&/Generations/Generations"))
const ViewGeneration = lazy(()=>import("&/Generations/Pages/View/View"))

const RootInfos = lazy(()=>import("&/RootInfos/RootInfos"))
const ViewRootInfos = lazy(()=>import("&/RootInfos/Pages/View/View"))
const NewRootInfos = lazy(()=>import("&/RootInfos/Pages/New/New"))
const EditRootInfos = lazy(()=>import("&/RootInfos/Pages/Edit/Edit"))

const Topics = lazy(()=>import("&/Topics/Topics"))
const NewTopic = lazy(()=>import("&/Topics/Pages/New/New"))
const ViewTopic = lazy(()=>import("&/Topics/Pages/View/View"))
const ViewTopicRootInfo = lazy(()=>import("&/Topics/Pages/View/Pages/View/View"))
const NewTopicRootInfo = lazy(()=>import("&/Topics/Pages/View/Pages/New/New"))
const EditTopicRootInfo = lazy(()=>import("&/Topics/Pages/View/Pages/Edit/Edit"))

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
                path: "topicos",
                children:[
                    {
                        element: <PageLoader Element={Topics}/>,
                        index: true,
                    },
                    {
                        element: <PageLoader Element={NewTopic}/>,
                        path: 'novo',
                    },
                    {
                        element: <PageLoader Element={ViewTopic}/>,
                        path: ':id',
                    },
                    {
                        element: <PageLoader Element={NewTopicRootInfo}/>,
                        path: ':id/novo',
                    },
                    {
                        element: <PageLoader Element={ViewTopicRootInfo}/>,
                        path: ':id/:infoid',
                    },
                    {
                        element: <PageLoader Element={EditTopicRootInfo}/>,
                        path: ':id/editar/:infoid',
                    },
                ]
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
                path: 'inforaiz',
                children: [
                    {
                        element: <PageLoader Element={RootInfos}/>,
                        index:true,
                    },
                    {
                        element: <PageLoader Element={ViewRootInfos}/>,
                        path: ':id',
                    },
                    {
                        element: <PageLoader Element={NewRootInfos}/>,
                        path: 'novo',
                    },
                    {
                        element: <PageLoader Element={EditRootInfos}/>,
                        path: 'editar/:id',
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
                        element: <PageLoader Element={EditUser}/>,
                        path: 'editar/:id',
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