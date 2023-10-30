import { HttpJson } from "./Http"

const fetchNeighrborAdd = async (targetId, success, fail) => {
  await HttpJson.post(`/neighbor/${targetId}`).then(success).catch(fail)
}

const neighborCheck = async (targetRoomId, success, fail) => {
  await HttpJson.get(`/neighbor/check/${targetRoomId}`)
    .then(success)
    .catch(fail)
}

const deleteNeighbor = async (param, success, fail) => {
  await HttpJson.post(`/neighbor/delete`, param).then(success).catch(fail)
}

const fetchNeighborRequest = async (success, fail) => {
  await HttpJson.post(`/neighbor/request`).then(success).catch(fail)
}

export {
  fetchNeighrborAdd,
  neighborCheck,
  deleteNeighbor,
  fetchNeighborRequest,
}
