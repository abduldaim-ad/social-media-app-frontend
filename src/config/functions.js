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

    if (method !== 'get' && method !== 'Get' && method !== 'GET' !==
        method !== 'delete' && method !== 'Delete' && method !== 'DELETE'
    ) {
        config.data = body;
    }

    try {
        const response = await axios.request(config);
        return response;
    } catch ({ response }) {
        return response.data;
    }
}