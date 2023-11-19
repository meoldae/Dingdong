// Three.js
import { Canvas } from "@react-three/fiber"
import Experience from "../../components/Room/Experience"

// 라이브러리
import { useState, useEffect, useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"

// API
import { fetchRoomData } from "../../api/User"

// ATOM
import {
  ItemsState,
  lightColorState,
  roomColorState,
  draggedItemState,
} from "../../components/Room/Atom"
import { userAtom } from "../../atom/UserAtom"
import { roomInfoAtom } from "@/atom/RoomInfoAtom"

// 컴포넌트
import InviteFooter from "../../components/Footer/InviteFooter"
import InviteHeader from "../../components/Header/InviteHeader"

// 스타일
import styles from "./RoomPage.module.css"

const InviteRoomPage = () => {
  // use함수
  const navigate = useNavigate()
  const canvasRef = useRef()

  // 리코일상태관리
  const [items, setItems] = useRecoilState(ItemsState)
  const [nickName, setNickName] = useRecoilState(roomInfoAtom)
  const [roomColor, setRoomColor] = useRecoilState(roomColorState)
  const [lightColor, setLightColor] = useRecoilState(lightColorState)
  const [drag, setDrag] = useRecoilState(draggedItemState)

  // 상태관리
  const [time, setTime] = useState()
  const [roomDrag, setRoomDrag] = useState(false)

  // 방 ID
  const roomId = window.location.pathname.match(/\d+/g)

  // 유저정보
  const userInfo = useRecoilValue(userAtom)

  // 날짜정보
  const today = new Date()
  
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 방 이동 함수
  const onRoomHandler = (e) => {
    navigate(`${urlPath}/room/${roomId}`)
  }

  useEffect(() => {
    if (userInfo && userInfo.accessToken !== "") {
      onRoomHandler()
      return
    }
    const roomId = window.location.pathname.match(/\d+/g)

    fetchRoomData(
      roomId,
      (response) => {
        setRoomColor(response.data.data.wallColor)
        setLightColor(response.data.data.lightColor)
        setItems(response.data.data.roomFurnitureList)
        setNickName(response.data.data.nickname)
      },
      (error) => {
        console.error("Error at fetching RoomData...", error)
        if (error.response && error.response.status === 400) {
          navigate(`${urlPath}/notfound`)
        }
      }
    )
  }, [])

  // 시간 계산 함수
  useEffect(() => {
    const checkTime = today.getHours()

    if (checkTime >= 22 || checkTime < 6) {
      setTime("dawn")
    } else if (checkTime >= 6 && checkTime < 10) {
      // 06시부터 10시까지 morning
      setTime("morning")
    } else if (checkTime >= 10 && checkTime < 18) {
      // 10시부터 18시까지 afternoon
      setTime("afternoon")
    } else {
      // 18시부터 22시까지 dinner
      setTime("dinner")
    }
  }, [])

  return (
    <>
      {roomDrag && <div className={styles.roomDrag} />}
      {time && (
        <div className={`${styles.container}`}>
          <InviteHeader />
          <div className={`${styles.newcanvas} ${styles[time]}`} id="newcanvas">
            <Canvas
              className={styles.canvasCont}
              shadows
              dpr={[1, 2]}
              gl={{
                preserveDrawingBuffer: true,
                antialias: true,
                pixelRatio: Math.min(2, window.devicePixelRatio),
              }}
              camera={{ fov: 45, zoom: 1.1 }}
              ref={canvasRef}
              flat={true}
            >
              <Experience setRoomDrag={setRoomDrag} />
            </Canvas>
          </div>
          <InviteFooter props={roomId[0]} />
        </div>
      )}
    </>
  )
}

export default InviteRoomPage
