import axios from "axios"
import { useSetRecoilState } from "recoil"
import { userAtom } from "@/atom/UserAtom"
import { useNavigate } from "react-router-dom"

const RedirectPage = () => {
  const navigate = useNavigate()
  const setLoginInfo = useSetRecoilState(userAtom)
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get("token")

  if (token !== null) {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/member/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        const avatarId = response.data.data.avatarId
        const nickname = response.data.data.nickname
        const roomId = response.data.data.roomId

        setLoginInfo((prevState) => ({
          ...prevState,
          accessToken: token,
          avatarId: avatarId,
          nickname: nickname,
          roomId: roomId,
        }))

        navigate(`${urlPath}/`)
      })
      .catch((error) => {
        console.error("API 요청 오류:", error)
      })
  }
}

export default RedirectPage
