// 스타일
// import style from "./LoginPage.css"

// 통신
import axios from "axios"

const LoginPage = () => {
  const loginHandler = () => {
    window.location.href = `https://${
      import.meta.env.VITE_SERVER_URL
    }/oauth2/authorization/kakao`
  }

  return (
    <div>
      <button onClick={loginHandler}>로그인</button>
    </div>
  )
}

export default LoginPage
