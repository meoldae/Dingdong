import loginKakao from "/assets/images/login_kakao.png"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import LoginMatter from "./LoginMatter"

const Login = () => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const loginHandler = () => {window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`}

  const guestLoginHandler = () => {
    navigate(`${urlPath}/tutorial`)
  }

  const posteCardTest = () => {
    navigate(`${urlPath}/yourstamp`)
  }

  return (
    <div className={styles.container}>
      <div id="matterCanvasCon">
        <LoginMatter />
      </div>
      <div className={styles.logo}>
        <img src={`${urlPath}/assets/images/dingdonglogo2.png`} alt="" />
      </div>
      <div className={styles.buttons}>
        <img src={loginKakao} alt="카카오로그인" onClick={loginHandler} />
        {/* <button onClick={guestLoginHandler} className={styles.guestButton}>
          게스트 로그인
        </button> */}
        <div className={styles.testButton} onClick={posteCardTest}>
          <p>나의 우표 유형 테스트 하러 가기!</p>
        </div>
      </div>
    </div>
  )
}

export default Login
