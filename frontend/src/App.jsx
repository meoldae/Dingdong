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

// API
import { fetchOnSession, fetchOffSession } from "./api/Session.js"

// FCM
import { getMessaging, onMessage } from "firebase/messaging";
import { successMsg } from "./utils/customToast.jsx"

const AppWrapper = () => {
  // FCM 설정
  const messaging = getMessaging();

  onMessage(messaging, (payload) => {
    if (payload.notification.title === "딩동! 편지왔어요") {
      successMsg(`💌 ${payload.notification.body}`)
    } else if (payload.notification.title === "딩동! 놀러왔어요") {
      successMsg(`🔔 ${payload.notification.body}`)
    }
  })

  // 세션관리
  useEffect(() => {
    const isUserAtom = localStorage.getItem("userAtom")

    const onSession = () => {
      if (isUserAtom !== null && isUserAtom !== "") {
        if (document.visibilityState === "visible") {
          fetchOnSession(
            (success) => {},
            (error) => {
              console.log("Error at Fail to connect session...", error)
            }
          )
        } else {
          fetchOffSession(
            (success) => {},
            (error) => {
              console.log("Error at Fail to disconnect session...", error)
            }
          )
        }
      }
    }
    onSession()
    // visibility change 이벤트 리스너 등록
    document.addEventListener("visibilitychange", onSession)
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("visibilitychange", onSession);
    };
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
