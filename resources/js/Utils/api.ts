import axios from 'axios';
import router from "@/Router/index"
const api = axios
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) =>{
        if (error.response.status === 401) {
            const currentUrl = window.location.pathname
            const parts = currentUrl.split('/')
            const lastPart = parts[parts.length - 1]
            if (lastPart !== 'login') {
                router.navigate('/login')
            }
        }
        return Promise.reject(error);
    }
)
api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")
export default api