import axios from 'axios';
import logger from '../services/logService';
import { toast } from 'react-toastify';

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

function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
};
