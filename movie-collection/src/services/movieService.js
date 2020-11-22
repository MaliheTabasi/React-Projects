import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/movies';

function movieUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getMovies() {
    return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {
    if (movie._id) {
        //deleting id from body because we have id in the url
        // having id in both url and body is confusing. which one is correct?!
        const body = { ...movie };
        console.log(body);

        delete body._id;
        console.log(body);
        return http.put(movieUrl(movie._id), body);
    }
    return http.post(apiEndpoint, movie);
}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId));
}
