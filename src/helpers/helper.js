

export async function doFetch(url, type, data, token = null) {

    let method = type || "GET"
    let body = data || null

    const option = {
        method: method,
        body : body,
        headers: {
            'authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(url, option);
        const result = await response.json();
        return result;
    }

    catch(error){
        console.error(error);
    }
}
