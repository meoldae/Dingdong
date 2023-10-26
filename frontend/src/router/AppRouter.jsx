import { BrowserRouter, Route, Routes } from "react-router-dom"

import AppMain from "../pages/Main/MainPage"
import AppRoom from "../pages/Room/RoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppUserSetting from "../pages/User/UserSettingPage"
import SingleMainPage from "../pages/SinglePlay/SingleMainPage"
import TutorialPage from "../pages/SinglePlay/TutorialPage"
import ProfileSelect from "../pages/User/ProfileSelect"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<AppMain />} />
          <Route path="/single" element={<SingleMainPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/room" element={<AppRoom />} />
          <Route path="/login" element={<AppLogin />} />
          <Route path="/signup" element={<AppSignUp />} />
          <Route path="/usersetting" element={<AppUserSetting />} />
          <Route path="/profileselect" element={<ProfileSelect />} />
        </Route>
        <Route path="/*" element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
