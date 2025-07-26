import { useSelector } from "react-redux";
export function useFetch() {
    
    const baseURL = useSelector(state => state.apiConfig.baseURL);

    const token = JSON.parse(localStorage.getItem("user_data"));
    // console.log(token.token);
    function request(method = 'GET', url, body = {}, successMsg, errorMsg) {
    
        if(!url.includes("http")) {
            url = baseURL + url;
        }
    
        const requestOptions = {
            method,
            headers: {
                'Authorization': `Bearer ${token.token}`,
            }
        }
    
        if(method === 'POST' || method === 'PUT') {
            requestOptions.headers['Accept'] = 'application/json';
            if(body instanceof FormData) {
                requestOptions.body = body;
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        }
        
        // console.log(url);
        // console.log(requestOptions);
        fetch(url, requestOptions)
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp);
            successMsg(resp);
        })
        .catch(err => {
            if(errorMsg) errorMsg(err);
            else console.log(err);
        });
    }

    return request;
}