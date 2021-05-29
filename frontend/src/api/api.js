import axios from 'axios'

const api = axios.create({

    baseURL: 'http://localhost:3333'

});
 
export default api;

/*
export const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export const find = async(url, setData) => {
    const answer = await api.get(url)
    setData(answer.data)
}*/