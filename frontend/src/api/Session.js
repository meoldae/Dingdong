import { HttpJson } from "./Http";

// 세션 연결
const fetchOnSession = async (success, fail) => {
    await HttpJson.get(`member/connect`).then(success).catch(fail);
};

// 세션 종료
const fetchOffSession = async (success, fail) => {
  await HttpJson.delete(`member/disconnect`).then(success).catch(fail);
};

export { fetchOnSession, fetchOffSession };