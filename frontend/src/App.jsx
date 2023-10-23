import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import AppRouter from "./router/AppRouter.jsx"
import "./App.css"
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
)
