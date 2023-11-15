import { HttpJson } from "./Http";

// 편지 보내기
const sendLetter = async (param, success, fail) => {
    HttpJson.post(`letter`, JSON.stringify(param)).then(success).catch(fail);
}

// 게스트모드 편지 보내기
const sendGuestLetter = async (param, success, fail) => {
    HttpJson.post(`letter/guest`, JSON.stringify(param)).then(success).catch(fail);
}

// 편지 상세보기
const getLetterDetail = async (param, success, fail) => {
    HttpJson.get(`letter/${param}`).then(success).catch(fail);
}

// 편지 신고하기
const reportLetter = async (param, success, fail) => {
    HttpJson.post(`report/letter/${param}`).then(success).catch(fail)
}

// 편지 보내기 SNS
const sendLetterSNS = async (param, success, fail) =>{
    HttpJson.post(`letter/sns`, JSON.stringify(param)).then(success).catch(fail)
}

// 편지 상세보기 SNS
const getLetterSNSDetail = async (param, success, fail) => {
    HttpJson.get(`letter/sns/${param}`).then(success).catch(fail);
}

// 편지 보내기 우체국
const sendLetterPostOffice = async (params, success, fail) => {
    HttpJson.post(`letter/all`, params).then(success).catch(fail);
}

export { sendLetter, sendGuestLetter, getLetterDetail, reportLetter, sendLetterSNS, getLetterSNSDetail, sendLetterPostOffice };