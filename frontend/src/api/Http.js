<<<<<<< HEAD
import axios from "axios";
import { onRequest, onErrorRequest, onResponse, onErrorResponse } from "./Interceptor";
=======
const axios = require("axios");
const { onRequest, onErrorRequest, onResponse, onErrorResponse } = require("./Interceptor");
>>>>>>> 62ab40659c9bfb75162777759c48726204a46681

const HttpJson = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000000,
    headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
    withCredentials: true
=======
    withCredentials: true,
>>>>>>> 62ab40659c9bfb75162777759c48726204a46681
});

HttpJson.interceptors.request.use(onRequest, onErrorRequest);
HttpJson.interceptors.response.use(onResponse, onErrorResponse);

const HttpForm = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'multipart/form-data' },
<<<<<<< HEAD
    withCredentials: true
=======
    withCredentials: true,
>>>>>>> 62ab40659c9bfb75162777759c48726204a46681
});

HttpForm.interceptors.request.use(onRequest, onErrorRequest);
HttpForm.interceptors.response.use(onResponse, onErrorResponse);

<<<<<<< HEAD
export { HttpJson, HttpForm };
=======
module.exports = { HttpJson, HttpForm };
>>>>>>> 62ab40659c9bfb75162777759c48726204a46681
