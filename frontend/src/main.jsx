import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RecoilRoot } from "recoil"
import AppRouter from "./router/AppRouter.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <AppRouter />
    <App />
  </RecoilRoot>
)
