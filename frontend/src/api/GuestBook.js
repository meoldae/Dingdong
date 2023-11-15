import { HttpJson } from "./Http";

// 방명록 작성
const fetchWriteGuestBook = async (params, success, fail) => {
    await HttpJson.post(`visitorbook`, params).then(success).catch(fail);
};

// 게스트모드 방명록 작성
const fetchGuesteWriteGuestBook = async (params, success, fail) => {
    await HttpJson.post(`visitorbook/guest`, params).then(success).catch(fail);
};

// 방명록 리스트
const fetchListGuestBook = async (roomId, success, fail) => {
    await HttpJson.get(`visitorbook/list/${roomId}`).then(success).catch(fail);
};

// 방명록 상세
const fetchDetailGuestBook = async (guestBookId, success, fail) => {
    await HttpJson.get(`visitorbook/detail/${guestBookId}`).then(success).catch(fail);
};

// 방명록 신고
const fetchReportGuestBook = async (guestBookId, success, fail) => {
    await HttpJson.post(`report/visitorbook/${guestBookId}`).then(success).catch(fail);
};

export { fetchWriteGuestBook, fetchListGuestBook, fetchDetailGuestBook, fetchReportGuestBook,fetchGuesteWriteGuestBook };