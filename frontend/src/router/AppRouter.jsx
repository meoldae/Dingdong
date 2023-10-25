import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoute from "./AuthRouter";
import AppMain from "../pages/Main/MainPage"
import AppRoom from "../pages/Room/RoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppRedirect from "../pages/User/RedirectPage"
import AppUserSetting from "../pages/User/UserSettingPage"
import TutorialPage from "../pages/Main/TutorialPage"
import CharacterPage from "../pages/Main/CharacterPage"
import ProfileSelect from "../pages/User/ProfileSelect";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute authentication="user"/>}>
          <Route path="/" element={<AppMain />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/room" element={<AppRoom />} />
          <Route path="/usersetting" element={<AppUserSetting />} />
          <Route path="/profileselect" element={<ProfileSelect />} />
        </Route>
        <Route element={<AuthRoute authentication="NotUser"/>}>
          <Route path="/login" element={<AppLogin />} />
          <Route path="/oauth2/redirect" element={<AppRedirect />} />
          <Route path="/signup" element={<AppSignUp />} />
        </Route>
        <Route path="/*" element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
