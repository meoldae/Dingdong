import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoute from "./AuthRouter";
import AppRoom from "../pages/Room/RoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppRedirect from "../pages/User/RedirectPage"
import AppUserSetting from "../pages/User/UserSettingPage"
import StampTest from "../pages/StampTest"
import StampTestResult from "../pages/StampTestResult";
import TutorialPage from "../pages/Main/TutorialPage"
import CharacterPage from "../pages/Main/CharacterPage"
import MainPage from "../pages/Main/CharacterPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute authentication="user"/>}> 
          <Route path="/" element={<MainPage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="/room" element={<AppRoom />} />
          <Route path="/usersetting" element={<AppUserSetting />} />
          <Route path="/stamptest" element={<StampTest />} />
          <Route path="/stampresult" element={<StampTestResult />} />
        </Route>
        <Route element={<AuthRoute authentication="NotUser"/>}>
          <Route path="/login" element={<AppLogin />} />
          <Route path="/oauth2/redirect" element={<AppRedirect />} />
          <Route path="/signup" element={<AppSignUp />} />
          <Route path="/tutorial" element={<TutorialPage />} />
        </Route>
        <Route path="/*" element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
