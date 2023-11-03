// 폰트
import "./fonts/Fonts.css"

// 스타일
import "./App.css"

// 라이브러리
import { useEffect } from "react"
import { RecoilRoot } from "recoil"
import ReactDOM from "react-dom/client"

// 컴포넌트
import { CustomToast } from "./utils/customToast.jsx"
import AppRouter from "./router/AppRouter.jsx"

const AppWrapper = () => {
  useEffect(() => {
    
  }, [])

  return (
    <div className="appWrapper">
      <AppRouter />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <AppWrapper />
    <CustomToast />
  </RecoilRoot>
)
