import { Navigate, Outlet, useLocation } from "react-router"
import { userAtom } from "@/atom/UserAtom"
import { useRecoilState } from "recoil"

export default function AuthRoute({ authentication }) {
  const location = useLocation()
  const currentPath = location.pathname

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
    currentPath.startsWith("/tutorial") ||
    currentPath.startsWith("/yourstamp") ||
    currentPath.startsWith("/invite")
  if (authText.indexOf("Not") === -1) {
    if (isLogin || isAllowedPath) return <Outlet />
    else return <Navigate to={redirect(true, authText)} />
  } else {
    if (!isLogin || isAllowedPath) return <Outlet />
    else return <Navigate to={redirect(false, authText.slice(3))} />
  }
}

function redirect(needLogin, authText) {
  let result = needLogin ? "/login" : "/"
  if (authText === "Admin") {
    result = "/adm" + result
  }

  return result
}
