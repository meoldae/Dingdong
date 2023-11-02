import { HttpJson, HttpForm } from "./Http";

const sendLetter = async (param, success, fail) => {
    HttpJson.post(`letter`, JSON.stringify(param)).then(success).catch(fail);
}

const sendGuestLetter = async (param, success, fail) => {
    HttpJson.post(`letter/guest`, JSON.stringify(param)).then(success).catch(fail);
}

const getLetterDetail = async (param, success, fail) => {
    HttpJson.get(`letter/${param}`).then(success).catch(fail);
}


const reportLetter = async (param, success, fail) => {
    HttpJson.post(`report/letter/${param}`).then(success).catch(fail)
}

const sendLetterSNS = async (param, success, fail) =>{
    HttpJson.post(`letter/sns`, JSON.stringify(param)).then(success).catch(fail)
}
const getLetterSNSDetail = async (param, success, fail) => {
    HttpJson.get(`letter/sns/${param}`).then(success).catch(fail);
}
export { sendLetter, sendGuestLetter, getLetterDetail, reportLetter, sendLetterSNS, getLetterSNSDetail };

