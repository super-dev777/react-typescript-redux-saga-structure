import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const axiosService = (function () {
    let AuthorizationToken: any = null;

    function addHeaders(userConfig: any) {
        const globalHeaders: any = {};

        if (AuthorizationToken) {
            globalHeaders['Authorization'] = `Bearer ${AuthorizationToken}`;
        }

        const { headers } = userConfig;

        return {
            headers: {
                ...globalHeaders,
                ...headers,
            },
        };
    }

    function setAuthorizationToken(token: string) {
        AuthorizationToken = token;
    }

    function get(endPoint: string, userConfig = {}) {
        return axios.get(endPoint, addHeaders(userConfig));
    }

    function post(endPoint: string, params = {}, userConfig = {}) {
        return axios.post(endPoint, params, addHeaders(userConfig));
    }

    function patch(endPoint: string, params = {}, userConfig = {}) {
        return axios.patch(endPoint, params, addHeaders(userConfig));
    }

    function put(endPoint: string, params = {}, userConfig = {}) {
        return axios.put(endPoint, params, addHeaders(userConfig));
    }

    function del(endPoint: string, userConfig = {}) {
        return axios.delete(endPoint, addHeaders(userConfig));
    }

    return {
        setAuthorizationToken,
        get,
        post,
        put,
        patch,
        del,
    };
})();
