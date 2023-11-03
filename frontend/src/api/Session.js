import { HttpJson } from "./Http";

const fetchOnSession = async (success, fail) => {
    await HttpJson.get(`member/connect`).then(success).catch(fail);
};

const fetchOffSession = async (success, fail) => {
  await HttpJson.delete(`member/disconnect`).then(success).catch(fail);
};

export { fetchOnSession, fetchOffSession };