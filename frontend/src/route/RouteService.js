import Axios from 'axios';

const API_URL = 'http://localhost:7777/users'  

class ApiService {

    fetchUsers() {  
        return Axios.get(API_URL);
    }

    fetchUserByID(id) { 
        return Axios.get(API_URL + '/' + id)
    }

    addUser(user) { 
        return Axios.post(API_URL, user);
    }

    editUser(user) {   
        return Axios.put(API_URL + '/' + user.id, user);
    }

    removeUser(id) { 
        return Axios.delete(API_URL + '/' + id);
    }
}

export default new ApiService();