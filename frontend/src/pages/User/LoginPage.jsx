// 스타일
import style from "./LoginPage.css"

// 통신
import axios from "axios"

const LoginPage = () => {
  const loginHandler = () => {
    console.log(import.meta.env.VITE_SERVER_URL)
    window.location.href = `https://${
      import.meta.env.VITE_SERVER_URL
    }/api/oauth2/authorization/kakao`
  }

  return (
    <div>
      <button onClick={loginHandler}>로그인</button>
    </div>
  )
}

export default LoginPage
