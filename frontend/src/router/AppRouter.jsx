import { BrowserRouter, Route, Routes } from "react-router-dom";



import AppMain from "../pages/Main/MainPage"
import AppRoom from "../pages/Room/RoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppUserSetting from "../pages/User/UserSettingPage"
import TutorialPage from "../pages/Main/TutorialPage"
import CharacterPage from "../pages/Main/CharacterPage"
import ProfileSelect from "../pages/User/ProfileSelect";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<AppMain />} />
          <Route path="/character" element={<CharacterPage />} />
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
  );
};

export default AppRouter;
