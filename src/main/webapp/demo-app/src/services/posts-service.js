import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/msg/';

class PostsService {
    getAllPosts(){
        return axios.get(API_URL, { headers: authHeader() });
    }

    findById(id){
        return axios.get(API_URL+id, { headers: authHeader() });
    }

    savePost(post){
        return axios.post(API_URL, post, { headers: authHeader() });
    }

    editPost(post){
        return axios.put(API_URL, post, { headers: authHeader() });
    }
}

export default new PostsService();