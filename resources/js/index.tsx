import router from './Router'
import {RouterProvider} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { GlobalContext } from './Context/GlobalContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const Main = (props:any) => {
    return (
        <GlobalContext.Provider value={props}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider 
                    router={router}
                />
            </QueryClientProvider>
        </GlobalContext.Provider>
    )
}
export default Main;