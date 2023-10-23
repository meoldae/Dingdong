import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import AppRouter from "./router/AppRouter.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <AppRouter />
  </RecoilRoot>
)
