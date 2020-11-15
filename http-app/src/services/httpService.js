import axios from 'axios';
import { toast } from 'react-toastify';
import logger from '../services/logService';
axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast('An Unexpected Error Occures... :(');
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
