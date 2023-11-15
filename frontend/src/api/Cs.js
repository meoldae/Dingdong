import { HttpJson } from "./Http";

// 문의하기 API 함수
const fetchInquiry = async (params, success, fail) => {
    await HttpJson.post(`cs`, params).then(success).catch(fail);
};

export { fetchInquiry };