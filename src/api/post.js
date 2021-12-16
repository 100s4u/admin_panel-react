import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export default class PostService {
    static async Login(login, pswd) {
        const response = await instance.get('/', {params: {method: 'login', login: login, password: pswd}});
        console.log(response)
        return response.data.response
    }
    static async Register(token, login, pswd){
        const response = await instance.get('/', {params: {method: 'register', token: token, login: login, password: pswd}});
        console.log(response.data)
        return response.data.response
    }
    static async GetPosts(page, token){
        const response = await instance.get('/', {params: {method: 'getPosts', token: token, page: page}});
        return response.data.response
    }
    static async GetViews(token){
        const response = await instance.get('/', {params: {method: 'getViews', token: token}});
        return response.data.response
    }
    static async GetTotalViews(token){
        const response = await instance.get('/', {params: {method: 'getTotalViews', token: token}});
        return response.data.response
    }
    static async GetTotalRead(token){
        const response = await instance.get('/', {params: {method: 'getTotalRead', token: token}});
        return response.data.response
    }
}