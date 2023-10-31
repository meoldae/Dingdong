import { HttpJson } from "./Http";

const fetchInquiry = async (params, success, fail) => {
    await HttpJson.post(`cs`, params).then(success).catch(fail);
};

export { fetchInquiry };