import axios from "axios"
export const HOST = 'http://localhost:3000';


export const createShortUrl = async (data) =>{
    const response = await axios.post(`${HOST}/short-url`, data);
    console.log('response', response);
    return response.data;
}

export const getShortUrls = async () =>{
    const response = await axios.get(`${HOST}/short-url`);
    console.log('response', response);
    return response.data;
}