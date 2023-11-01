import { HttpJson } from "./Http";

const fetchScore = async (success, fail) => {
    await HttpJson.get(`multi/scoreboard`).then(success).catch(fail);
};

export { fetchScore };