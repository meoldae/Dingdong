import { HttpJson } from "./Http";

const getFurnitureList = async (page, category, success, fail) => {
    await HttpJson.get(`/room/furniture?page=${page}&category=${category}`).then(success).catch(fail);
};

export { getFurnitureList };
