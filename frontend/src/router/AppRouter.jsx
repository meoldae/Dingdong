import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"

import AuthRoute from "./AuthRouter"
import AppRoom from "../pages/Room/RoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppRedirect from "../pages/User/RedirectPage"
import AppUserSetting from "../pages/User/UserSettingPage"
import StampTest from "../pages/StampTest/StampTest"
import StampTestResult from "../pages/StampTest/StampTestResult"
import MainPage from "../pages/Main/MainPage"
import SingleMainPage from "../pages/SinglePlay/SingleMainPage"
import TutorialPage from "../pages/SinglePlay/TutorialPage"
import PostPage from "../pages/Post/PostPage"
import InviteRoomPage from "../pages/Room/InviteRoomPage"
const Single = lazy(() => import("../pages/SinglePlay/SingleMainPage"))

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>대기중....</div>}>
        <Routes>
          <Route element={<AuthRoute authentication="user" />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/single" element={<Single />} />
            <Route path="/room/:roomId" element={<AppRoom />} />
            <Route path="/usersetting" element={<AppUserSetting />} />
            <Route path="/postoffice" element={<PostPage />} />
          </Route>

          <Route element={<AuthRoute authentication="NotUser" />}>
            <Route path="/login" element={<AppLogin />} />
            <Route path="/oauth2/redirect" element={<AppRedirect />} />
            <Route path="/signup" element={<AppSignUp />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/yourstamp" element={<StampTest />} />
            <Route path="/yourstamp/result" element={<StampTestResult />} />
            <Route path="/invite/:roomId" element={<InviteRoomPage />} />
          </Route>
          <Route path="/*" element={<AppNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}


export default AppRouter
