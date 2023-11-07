import { HttpJson } from "./Http";

// 방명록 작성
const fetchWriteGuestBook = async (params, success, fail) => {
    await HttpJson.post(`visitorbook`, params).then(success).catch(fail);
};

// 방명록 작성
const fetchListGuestBook = async (roomId, success, fail) => {
    await HttpJson.get(`visitorbook/list/${roomId}`).then(success).catch(fail);
};

export { fetchWriteGuestBook, fetchListGuestBook };