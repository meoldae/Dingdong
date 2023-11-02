import { Navigate, Outlet, useLocation } from "react-router"
import { userAtom } from "@/atom/UserAtom"
import { useRecoilState } from "recoil"

export default function AuthRoute({ authentication }) {
  const location = useLocation()
  const currentPath = location.pathname
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const [token, setToken] = useRecoilState(userAtom)
  let isLogin = token.accessToken !== "" && token.accessToken !== "undefined"

  if (
    localStorage.getItem("userAtom") &&
    token.accessToken !==
      JSON.parse(localStorage.getItem("userAtom")).accessToken
  ) {
    setToken(JSON.parse(localStorage.getItem("userAtom")))
    isLogin = true
  }

  if (token.accessToken === "undefined") {
    setToken({ accessToken: "" })
  }

  const authText = authentication

  const isAllowedPath =
    currentPath.startsWith(`${urlPath}/tutorial`) ||
    currentPath.startsWith(`${urlPath}/yourstamp`) ||
    currentPath.startsWith(`${urlPath}/invite`) ||
    currentPath.startsWith(`${urlPath}/letter`)
  if (authText.indexOf("Not") === -1) {
    if (isLogin || isAllowedPath) return <Outlet />
    else return <Navigate to={redirect(true, authText)} />
  } else {
    if (!isLogin || isAllowedPath) return <Outlet />
    else return <Navigate to={redirect(false, authText.slice(3))} />
  }
}

function redirect(needLogin, authText) {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  let result = needLogin ? `${urlPath}/login` : "/"
  if (authText === "Admin") {
    result = "/adm" + result
  }

  return result
}
