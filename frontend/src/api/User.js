import { HttpJson } from "./Http"

const CreateUser = async (param, success, fail) => {
  await HttpJson.post(`member/signup`, JSON.stringify(param))
    .then(success)
    .catch(fail)
}

const GetAvatarList = async (success, fail) => {
  await HttpJson.get(`avatar/list`).then(success).catch(fail)
}

const DoubleCheck = async (param, success, fail) => {
  await HttpJson.get(`member/check/${param}`).then(success).catch(fail)
}

const RefreshToken = async (success, fail) => {
  await HttpJson.post(`auth/refresh`).then(success).catch(fail)
}

const fetchUserInfo = async (success, fail) => {
  await HttpJson.get(`member/login`).then(success).catch(fail)
}

const fetchRoomData = async (roomId, success, fail) => {
  await HttpJson.get(`room/${roomId}`).then(success).catch(fail)
}

const fetchLetterData = async (param, success, fail) => {
  await HttpJson.get(`letter?page=${param}`).then(success).catch(fail)
}

const fetchLogout = async (success, fail) => {
  await HttpJson.delete(`member/logout`).then(success).catch(fail)
}

const fetchUserSecession = async (success, fail) => {
  await HttpJson.delete(`member`).then(success).catch(fail)
}

export {
  CreateUser,
  GetAvatarList,
  RefreshToken,
  fetchRoomData,
  fetchUserInfo,
  fetchLetterData,
  DoubleCheck,
  fetchLogout,
  fetchUserSecession,
}
