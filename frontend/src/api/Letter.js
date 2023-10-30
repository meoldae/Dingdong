import { HttpJson, HttpForm } from "./Http";

const sendLetter = async (param, success, fail) => {
    HttpJson.post(`letter`, JSON.stringify(param)).then(success).catch(fail);
}

export { sendLetter };