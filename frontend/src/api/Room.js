import { HttpJson } from "./Http";

const isHeartCheck = async (roomId, success, fail) => {
    await HttpJson.get(`/room/heart/${roomId}`).then(success).catch(fail);
};

const updateHeart = async (roomId, success, fail) => {
    await HttpJson.post(`/room/heart/${roomId}`).then(success).catch(fail);
};

const getRandomRoom = async (success, fail) => {
    await HttpJson.get(`/room/random`).then(success).catch(fail);
};

export { isHeartCheck, updateHeart, getRandomRoom };