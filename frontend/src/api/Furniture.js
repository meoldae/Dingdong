import { HttpJson } from "./Http";

// 가구 리스트 API
const getFurnitureList = async (page, category, success, fail) => {
    await HttpJson.get(`/room/furniture?page=${page}&category=${category}`).then(success).catch(fail);
};

// 가구 상세정보 API
const getFurnitureDetail = async (furnitureId, success, fail) =>{
    await HttpJson.get(`/room/furniture/${furnitureId}`).then(success).catch(fail);
}

// 가구 업데이트 API
const updateFurnitureList = async (params, success,fail) =>{
    await HttpJson.post(`/room`, params).then(success).catch(fail)
}

export { getFurnitureList, getFurnitureDetail, updateFurnitureList };