import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Suspense, useEffect, lazy } from "react"

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
import LoadingPage from "../components/UI/LoadingPage"
import Error from "../components/UI/Error"
import ReactGA from "react-ga";
// const Room = lazy(() => import("../pages/SinglePlay/SingleMainPage"))


const gaTrackingId = import.meta.env.VITE_APP_GA_TRACKING_ID;
ReactGA.initialize(gaTrackingId); 

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <Suspense fallback={<LoadingPage content={"잠시만 기다려 주세요"} />}>
        <Routes>
          <Route element={<AuthRoute authentication="user" />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/single" element={<SingleMainPage />} />
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
