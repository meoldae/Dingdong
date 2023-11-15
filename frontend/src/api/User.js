import { HttpJson } from "./Http"

// 유저 생성
const CreateUser = async (param, success, fail) => {
  await HttpJson.post(`member/signup`, JSON.stringify(param))
    .then(success)
    .catch(fail)
}

// 아바타 리스트 가져오기
const GetAvatarList = async (success, fail) => {
  await HttpJson.get(`avatar/list`).then(success).catch(fail)
}

// 닉네임 중복 체크
const DoubleCheck = async (param, success, fail) => {
  await HttpJson.get(`member/check/${param}`).then(success).catch(fail)
}

// 리프레쉬 토큰
const RefreshToken = async (success, fail) => {
  await HttpJson.post(`auth/refresh`).then(success).catch(fail)
}

// 유저정보 가져오기
const fetchUserInfo = async (success, fail) => {
  await HttpJson.get(`member/login`).then(success).catch(fail)
}

// 방 정보 가져오기
const fetchRoomData = async (roomId, success, fail) => {
  await HttpJson.get(`room/${roomId}`).then(success).catch(fail)
}

// 편지 정보 가져오기
const fetchLetterData = async (param, success, fail) => {
  await HttpJson.get(`letter?page=${param}`).then(success).catch(fail)
}

// 로그아웃
const fetchLogout = async (success, fail) => {
  await HttpJson.delete(`member/logout`).then(success).catch(fail)
}

// 유저 세션
const fetchUserSecession = async (success, fail) => {
  await HttpJson.delete(`member`).then(success).catch(fail)
}

// 닉네임 검색
const fetchSerchNickname = async (name, success, fail) => {
  await HttpJson.get(`member/range/${name}`).then(success).catch(fail)
}

// 멀티 유저
const fetchMultiUser = async (channelId, success, fail) => {
  await HttpJson.get(`multi/${channelId}`).then(success).catch(fail)
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
  fetchSerchNickname,
  fetchMultiUser,
}
