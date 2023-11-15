import { HttpJson } from "./Http";

// 좋아요 여부 판단
const isHeartCheck = async (roomId, success, fail) => {
    await HttpJson.get(`/room/heart/${roomId}`).then(success).catch(fail);
};

// 좋아요 업데이트
const updateHeart = async (roomId, success, fail) => {
    await HttpJson.post(`/room/heart/${roomId}`).then(success).catch(fail);
};

// 랜덤방문
const getRandomRoom = async (success, fail) => {
    await HttpJson.get(`/room/random`).then(success).catch(fail);
};

export { isHeartCheck, updateHeart, getRandomRoom };