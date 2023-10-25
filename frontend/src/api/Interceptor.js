const axios = require("axios");
const { RefreshToken } = require("./User");

const onRequest = (config) => {
    const accessToken = localStorage.getItem('accessToken') != null ? `Bearer ` + JSON.parse(localStorage.getItem('accessToken')).accessToken : "";

    config.headers.Authorization = accessToken;
    return config;
};

const onErrorRequest = (err) => {
    return Promise.reject(err);
};

const onResponse = (res) => {
    return res;
};

const onErrorResponse = async (errResult) => {
    const err = errResult;
    const { response } = err;
    const originalConfig = err.config;

    if (response && response.status === 401) {
        RefreshToken(({ data }) => {
            localStorage.setItem('accessToken', `${data.data.accessToken}"`);
            axios.defaults.headers.common.Authorization = `Bearer ` + data.data.accessToken;
            originalConfig.headers.Authorization = `Bearer ` + data.data.accessToken;

            return axios(originalConfig);
        }, (error) => console.log(error)).then((res) => {
        });
    }

    return Promise.reject(err);
};

module.exports = { onRequest, onErrorRequest, onResponse, onErrorResponse };
