import { HttpJson } from "./Http"

// 이웃추가
const fetchNeighrborAdd = async (targetId, success, fail) => {
  await HttpJson.post(`/neighbor/${targetId}`).then(success).catch(fail)
}

// 이웃여부 판단
const neighborCheck = async (targetRoomId, success, fail) => {
  await HttpJson.get(`/neighbor/check/${targetRoomId}`)
    .then(success)
    .catch(fail)
}

// 이웃 제거
const deleteNeighbor = async (param, success, fail) => {
  await HttpJson.post(`/neighbor/delete`, param).then(success).catch(fail)
}

// 이웃 요청
const fetchNeighborRequest = async (success, fail) => {
  await HttpJson.get(`/neighbor/request`).then(success).catch(fail)
}

// 이웃 요청 응답
const responseNeighborRequest = async (param, success, fail) => {
  await HttpJson.post(`/neighbor/response`, param).then(success).catch(fail)
}

// 이웃 리스트
const fetchNeighborList = async (success, fail) => {
  await HttpJson.get(`neighbor/list`).then(success).catch(fail)
}

export {
  fetchNeighrborAdd,
  neighborCheck,
  deleteNeighbor,
  fetchNeighborRequest,
  responseNeighborRequest,
  fetchNeighborList,
}
