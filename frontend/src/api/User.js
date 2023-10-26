import { HttpJson } from "./Http";

const CreateUser = async (param, success, fail) => {
    await HttpJson.post(`member/signup`, JSON.stringify(param))
        .then(success)
        .catch(fail);
};

const GetAvatarList = async (success, fail) => {
    await HttpJson.get(`avatar/list`).then(success).catch(fail);
};

const RefreshToken = async (success, fail) => {
    await HttpJson.post(`auth/refresh`).then(success).catch(fail);
};

const fetchRoomData = async (success, fail) => {
    await HttpJson.get(``).then(success).catch(fail);
}

export { CreateUser, GetAvatarList, RefreshToken, fetchRoomData };
