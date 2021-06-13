import axios from 'axios'

const api = axios.create({

    baseURL: 'http://localhost:3333'

});

export const STORAGE_URL = process.env.REACT_APP_API_STORAGE;

console.log(STORAGE_URL);

export default api;

/*
export const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export const find = async(url, setData) => {
    const answer = await api.get(url)
    setData(answer.data)
}*/