import router from './Router'
import {RouterProvider} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})



const Main = () => {
    
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </>
    )
}
export default Main;