import loginKakao from "/assets/images/login_kakao.png"
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css"

const Login = () => {
    const navigate = useNavigate();

    const loginHandler = () => {
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`
    }

    const guestLoginHandler = () => {
      navigate("/tutorial");
    }
    
    return (
      <div className={style.container}>
        {/* <div className={style.centered}> */}
            <div className={style.buttons}>
                <img src={loginKakao} alt="카카오로그인" onClick={loginHandler} style={{cursor: 'pointer'}}/>
                <button onClick={guestLoginHandler} className={style.guestButton}>게스트 로그인</button>
            </div>
        {/* </div> */}
      </div>
    )
}
  
export default Login