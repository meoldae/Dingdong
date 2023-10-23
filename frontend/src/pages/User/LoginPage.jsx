// 스타일
import style from "./LoginPage.css"

// 통신
import axios from "axios"
import DefaultBtn from "../../components/Button/Default/DefaultBtn"
import RoomBtn from "../../components/Button/Room/RoomBtn"

const LoginPage = () => {
  const loginHandler = () => {
    window.location.href = `https://${
      import.meta.env.VITE_SERVER_URL
    }/api/oauth2/authorization/kakao`
  }

  return (
    <div>
      <button onClick={loginHandler}>로그인</button>
      <DefaultBtn btnName="확인" />
      <RoomBtn img="share" />
    </div>
  )
}

export default LoginPage
