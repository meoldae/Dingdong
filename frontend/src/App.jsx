import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import { CustomToast } from "./utils/customToast.jsx"
import AppRouter from "./router/AppRouter.jsx"
import "./fonts/Fonts.css"
import "./App.css"

const AppWrapper = () => {
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
