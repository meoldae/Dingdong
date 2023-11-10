import loginKakao from "/assets/images/login_kakao.png";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;
  const loginHandler = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/oauth2/authorization/kakao`;
  };

  const guestLoginHandler = () => {
    navigate(`${urlPath}/tutorial`);
  };

  const posteCardTest = () => {
    navigate(`${urlPath}/yourstamp`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={`${urlPath}/assets/images/logo.png`} alt="로고" />
      </div>
      <div className={styles.slogan}>
        <img src={`${urlPath}/assets/images/slogun.png`} alt="슬로건"/>
      </div>

      <div className={styles.buttons}>
        <img src={loginKakao} alt="카카오로그인" onClick={loginHandler} />
        <div className={styles.testButton} onClick={posteCardTest}>
          <p>나의 우표 유형 테스트 하러 가기!</p>
        </div>
      </div>
      <div className={styles.home}>
        <img
          src={`${urlPath}/assets/images/logo2.png`}
          alt=""
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Login;
