// 라이브러리
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
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
