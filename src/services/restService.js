import axios from 'axios';
import { toast } from 'react-toastify';
import { error } from "./loggerService";

axios.interceptors.response.use(null, error => {
    if (!error.response || error.response.status < 400 || error.response.status >= 500) {
        error("Error getting movies from server - " + error);
        toast.error("an unexpected error happened");
    }
    return Promise.reject(error);
});

export default {
    get: axios.get
}