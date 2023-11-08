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
import LetterSNSReceivePage from "../pages/Postoffice/PostofficeReceiveLetter"

import Error from "../components/UI/Error"
import ReactGA from "react-ga4"
import { MultiPage } from "../components/Multi/MultiPage"
// const Room = lazy(() => import("../pages/SinglePlay/SingleMainPage"))

const urlPath = import.meta.env.VITE_APP_ROUTER_URL

const gaTrackingId = import.meta.env.VITE_APP_GA_TRACKING_ID
ReactGA.initialize(gaTrackingId)

const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.send("pageview")
  }, [location])

  return null
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <Suspense fallback={<LoadingPage content={"잠시만 기다려 주세요"} />}>
        <Routes>
          <Route element={<AuthRoute authentication="user" />}>
            <Route path={`${urlPath}/`} element={<SingleMainPage />} />
            {/* <Route path="/single" element={<SingleMainPage />} /> */}
            <Route path={`${urlPath}/room/:roomId`} element={<AppRoom />} />
            <Route
              path={`${urlPath}/random/:roomId`}
              element={<AppRandomRoom />}
            />
            <Route
              path={`${urlPath}/usersetting`}
              element={<AppUserSetting />}
            />
            <Route path={`${urlPath}/postoffice`} element={<PostPage />} />
            <Route path={`${urlPath}/multiPage`} element={<MultiPage />} />
          </Route>

          <Route element={<AuthRoute authentication="NotUser" />}>
            <Route path={`${urlPath}/login`} element={<AppLogin />} />
            <Route
              path={`${urlPath}/oauth2/redirect`}
              element={<AppRedirect />}
            />
            <Route path={`${urlPath}/signup`} element={<AppSignUp />} />
            <Route path={`${urlPath}/tutorial`} element={<TutorialPage />} />
            <Route path={`${urlPath}/yourstamp`} element={<StampTest />} />
            <Route
              path={`${urlPath}/yourstamp/result`}
              element={<StampTestResult />}
            />
            <Route
              path={`${urlPath}/invite/:roomId`}
              element={<InviteRoomPage />}
            />
            <Route
              path={`${urlPath}/letter/:letterId`}
              element={<LetterSNSReceivePage />}
            />
          </Route>
          <Route path={`${urlPath}/*`} element={<AppNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
