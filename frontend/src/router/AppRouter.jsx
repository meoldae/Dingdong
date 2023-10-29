import { BrowserRouter, Route, Routes } from "react-router-dom"

import AuthRoute from "./AuthRouter"
import AppRoom from "../pages/Room/RoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppRedirect from "../pages/User/RedirectPage"
import AppUserSetting from "../pages/User/UserSettingPage"
import StampTest from "../pages/StampTest/StampTest"
import StampTestResult from "../pages/StampTest/StampTestResult"; 
import MainPage from "../pages/Main/MainPage"
import SingleMainPage from "../pages/SinglePlay/SingleMainPage"
import TutorialPage from "../pages/SinglePlay/TutorialPage"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute authentication="user" />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/single" element={<SingleMainPage />} />
          <Route path="/room/:roomId" element={<AppRoom />} />
          <Route path="/usersetting" element={<AppUserSetting />} />
        </Route>

        <Route element={<AuthRoute authentication="NotUser" />}>
          <Route path="/login" element={<AppLogin />} />
          <Route path="/oauth2/redirect" element={<AppRedirect />} />
          <Route path="/signup" element={<AppSignUp />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/yourstamp" element={<StampTest />} />
          <Route path="/yourstamp/result" element={<StampTestResult />} />
        </Route>
        <Route path="/*" element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
