import axios from "axios";
import { RefreshToken } from "./User";

const urlPath = import.meta.env.VITE_APP_ROUTER_URL

const onRequest = (config) => {
    const accessToken = localStorage.getItem('userAtom') 
        ? `Bearer ` + JSON.parse(localStorage.getItem('userAtom')).accessToken 
        : "";

    config.headers.Authorization = accessToken;
    return config;
};

const onErrorRequest = (err) => {
    return Promise.reject(err);
};

const onResponse = (res) => {
    return res;
};

const onErrorResponse = async (err) => {
    const _err = err;
    const { response } = _err;
    const originalConfig = _err.config;

    if (response && response.status === 401) {
        RefreshToken(({ data }) => {
            const prev = JSON.parse(localStorage.getItem('userAtom'));
            prev.accessToken = data.data;

            localStorage.setItem('userAtom', JSON.stringify(prev));
            axios.defaults.headers.common.Authorization = `Bearer ` + data.data;
            originalConfig.headers.Authorization = `Bearer ` + data.data;

            return axios(originalConfig);
        }, (error) => console.log("Error with Axios", error)).then((res) => { });
    }

    if (response && response.status === 417) {
        localStorage.removeItem("userAtom");
        window.location.href = urlPath + '/login'
    }
    
    if (response && ( response.data.message  == '리프레시 토큰이 만료되었습니다.') ) {
        localStorage.removeItem("userAtom");
        window.location.href = urlPath + '/login'
    }

    return Promise.reject(err);
};

export { onRequest, onErrorRequest, onResponse, onErrorResponse };
