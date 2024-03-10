import Axios from 'axios';

const API_URL = 'http://localhost:7777/user/v1/mylist';

class FavoriteMovieApiService {
    fetchMovie(userId) {
        return Axios.get(API_URL + '/allmovies/' + userId);
    }
    
    addMovie(movie) {
        return Axios.post(API_URL+'/add', movie);
    }
    
    removeMovie(id) {
        return Axios.delete(API_URL + '/delete/' + id);
    }


}

export default new FavoriteMovieApiService();
