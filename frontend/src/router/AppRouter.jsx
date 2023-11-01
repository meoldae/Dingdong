import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Suspense, useEffect, lazy } from "react"

import AuthRoute from "./AuthRouter"
import AppRoom from "../pages/Room/RoomPage"
import AppRandomRoom from "../pages/Room/RandomRoomPage"
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
import ReactGA from "react-ga4";
// const Room = lazy(() => import("../pages/SinglePlay/SingleMainPage"))


const gaTrackingId = import.meta.env.VITE_APP_GA_TRACKING_ID;
ReactGA.initialize(gaTrackingId); 

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.send("pageview");
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
            <Route path="/feDev" element={<SingleMainPage />} />
            {/* <Route path="/single" element={<SingleMainPage />} /> */}
            <Route path="/feDev/room/:roomId" element={<AppRoom />} />
            <Route path="/feDev/random/:roomId" element={<AppRandomRoom />} />
            <Route path="/feDev/usersetting" element={<AppUserSetting />} />
            <Route path="/feDev/postoffice" element={<PostPage />} />
          </Route>

          <Route element={<AuthRoute authentication="NotUser" />}>
            <Route path="/feDev/login" element={<AppLogin />} />
            <Route path="/feDev/oauth2/redirect" element={<AppRedirect />} />
            <Route path="/feDev/signup" element={<AppSignUp />} />
            <Route path="/feDev/tutorial" element={<TutorialPage />} />
            <Route path="/feDev/yourstamp" element={<StampTest />} />
            <Route path="/feDev/yourstamp/result" element={<StampTestResult />} />
            <Route path="/feDev/invite/:roomId" element={<InviteRoomPage />} />
          </Route>
          <Route path="/feDev/*" element={<AppNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
