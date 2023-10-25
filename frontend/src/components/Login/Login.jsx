import loginKakao from "/assets/images/login_kakao.png"
import style from "./Login.module.css"

const Login = () => {
    const loginHandler = () => {
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`
    }

    return (
      <div className={style.container}>
        {/* <div className={style.centered}> */}
            <div className={style.buttons}>
                <img 
                    src={loginKakao} 
                    alt="카카오로그인" 
                    onClick={loginHandler}
                    style={{cursor: 'pointer'}}  // 마우스를 올렸을 때 손가락 모양으로 바뀌도록 설정
                />
            </div>
        {/* </div> */}
      </div>
    )
}
  
export default Login