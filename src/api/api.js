import axios from "axios"
// export const HOST = 'https://url-shortner-backend-11.herokuapp.com';

export const HOST = 'https://url-shortner-backend-1.netlify.app';


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
