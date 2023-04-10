import router from './Router'
import {RouterProvider} from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()



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