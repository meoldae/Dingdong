import { HttpJson } from "./Http"

const fetchNeighrborAdd = async (targetId, success, fail) => {
  await HttpJson.post(`/neighbor/${targetId}`).then(success).catch(fail)
}

export { fetchNeighrborAdd }
