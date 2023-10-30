import { HttpJson } from "./Http";

const getFurnitureList = async (page, category, success, fail) => {
    await HttpJson.get(`/room/furniture?page=${page}&category=${category}`).then(success).catch(fail);
};

const getFurnitureDetail = async (furnitureId, success, fail) =>{
    await HttpJson.get(`/room/furniture/${furnitureId}`).then(success).catch(fail);
}

const updateFurnitureList = async (params, success,fail) =>{
    await HttpJson.post(`/room`, params).then(success).catch(fail)
}
export { getFurnitureList, getFurnitureDetail, updateFurnitureList };

