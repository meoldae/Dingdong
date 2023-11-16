import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Suspense, useEffect, lazy } from "react"

import AuthRoute from "./AuthRouter"
import AppRoom from "../pages/Room/RoomPage"
import AppRandomRoom from "../pages/Room/RandomRoomPage"
import AppNotFound from "../pages/NotFound/NotFoundPage"
import AppLogin from "../pages/User/LoginPage"
import AppSignUp from "../pages/User/SignUpPage"
import AppRedirect from "../pages/User/RedirectPage"
import StampTest from "../pages/StampTest/StampTest"
import StampTestResult from "../pages/StampTest/StampTestResult"
import MainPage from "../pages/Main/MainPage"
import SingleMainPage from "../pages/SinglePlay/SingleMainPage"
import TutorialPage from "../pages/SinglePlay/TutorialPage"
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

// Suspense를 사용할 페이지 컴포넌트
const SuspensePage = ({ children }) => (
  <Suspense fallback={<LoadingPage content={"잠시만 기다려 주세요"} />}>
    {children}
  </Suspense>
)

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route element={<AuthRoute authentication="user" />}>
          <Route
            path={`${urlPath}/`}
            element={
              <SuspensePage>
                <SingleMainPage />
              </SuspensePage>
            }
          />
          {/* <Route path="/single" element={<SingleMainPage />} /> */}
          <Route
            path={`${urlPath}/multiPage`}
            element={
              <SuspensePage>
                <MultiPage />
              </SuspensePage>
            }
          />

          <Route
            path={`${urlPath}/random/:roomId`}
            element={<AppRandomRoom />}
          />
          <Route path={`${urlPath}/room/:roomId`} element={<AppRoom />} />
        </Route>

        <Route element={<AuthRoute authentication="NotUser" />}>
          <Route path={`${urlPath}/login`} element={<AppLogin />} />
          <Route
            path={`${urlPath}/oauth2/redirect`}
            element={<AppRedirect />}
          />
          <Route
            path={`${urlPath}/signup`}
            element={
              <SuspensePage>
                <AppSignUp />
              </SuspensePage>
            }
          />
          <Route
            path={`${urlPath}/tutorial`}
            element={
              <SuspensePage>
                <TutorialPage />
              </SuspensePage>
            }
          />
          <Route
            path={`${urlPath}/yourstamp`}
            element={
              <SuspensePage>
                <StampTest />
              </SuspensePage>
            }
          />
          <Route
            path={`${urlPath}/yourstamp/result`}
            element={
              <SuspensePage>
                <StampTestResult />
              </SuspensePage>
            }
          />
          <Route
            path={`${urlPath}/invite/:roomId`}
            element={
              <SuspensePage>
                <InviteRoomPage />
              </SuspensePage>
            }
          />
          <Route
            path={`${urlPath}/letter/:letterId`}
            element={
              <SuspensePage>
                <LetterSNSReceivePage />
              </SuspensePage>
            }
          />
        </Route>
        <Route path={`${urlPath}/*`} element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
