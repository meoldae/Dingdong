const axios = require("axios");
const { onRequest, onErrorRequest, onResponse, onErrorResponse } = require("./Interceptor");

const HttpJson = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

HttpJson.interceptors.request.use(onRequest, onErrorRequest);
HttpJson.interceptors.response.use(onResponse, onErrorResponse);

const HttpForm = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
});

HttpForm.interceptors.request.use(onRequest, onErrorRequest);
HttpForm.interceptors.response.use(onResponse, onErrorResponse);

module.exports = { HttpJson, HttpForm };