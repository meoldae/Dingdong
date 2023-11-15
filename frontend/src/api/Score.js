import { HttpJson } from "./Http";

// 랭킹정보
const fetchScore = async (success, fail) => {
    await HttpJson.get(`multi/scoreboard`).then(success).catch(fail);
};

export { fetchScore };