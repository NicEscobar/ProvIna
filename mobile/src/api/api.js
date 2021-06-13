import axios from 'axios'

const api = axios.create({

   baseURL: 'http://192.168.0.171:3333'
    //baseURL: 'http://192.168.1.30:3333'
    //baseURL: 'https://localhost:3333/'
    

});
 
export default api;