// 라이브러리
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  // 페이지 이동을 위한 navigate
  const navigate = useNavigate()

  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 메인페이지 이동 함수
  const posteCardTest = () => {
    navigate(`${urlPath}/`)
  }
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        height: "100vh",
        alignItems: "center",
        justifyContent:'center',
        background: "#FFF",
      }}
    >
      <img src={`${urlPath}/assets/images/404_error_page.png`} style={{ width: "100%" }} />
        <div onClick={posteCardTest}>
          <p style={{fontSize:"25px"}}>딩동으로 돌아가기</p>
        </div>
    </div>
  )
}

export default NotFoundPage
