import axios from 'axios';
const api = axios.create({
    baseURL: 'https://xx-yy.ab.com/api'
});

export default api;
