import { HttpJson } from "./Http";

const isHeartCheck = async (roomId, success, fail) => {
    await HttpJson.get(`/room/heart/${roomId}`).then(success).catch(fail);
};

const updateHeart = async (roomId, success, fail) => {
    await HttpJson.post(`/room/heart/${roomId}`).then(success).catch(fail);
};


export { isHeartCheck, updateHeart };