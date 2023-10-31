import { HttpJson, HttpForm } from "./Http";

const sendLetter = async (param, success, fail) => {
    HttpJson.post(`letter`, JSON.stringify(param)).then(success).catch(fail);
}

const getLetterDetail = async (param, success, fail) => {
    HttpJson.get(`letter/${param}`).then(success).catch(fail);
}

const reportLetter = async (param, success, fail) => {
    HttpJson.post(`report/letter/${param}`).then(success).catch(fail)
}

export { sendLetter, getLetterDetail, reportLetter };