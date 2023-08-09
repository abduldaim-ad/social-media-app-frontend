import axios from "axios";

export const FetchData = async (url, jwt, method, body) => {
    let config = {
        method,
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    };

    if (method !== 'get' && method !== 'Get' && method !== 'GET') {
        config.data = body;
    }

    try {
        const response = await axios.request(config);
        return response;
    } catch (error) {
        return error;
    }
}