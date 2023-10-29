import { Canvas } from "@react-three/fiber"
import { Html, PerspectiveCamera } from "@react-three/drei"
import Experience from "../../components/Room/Experience"
import { fetchRoomData } from "../../api/User"
import { Suspense, useState, useEffect, useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  draggedItemState,
} from "../../components/Room/Atom"
import { popUpStatusAtom } from "../../atom/RoomCustomTabAtom"

import Header from "../../components/Header/Header"
import MyFooter from "../../components/Footer/MyFooter"
import Share from "../../components/Header/Share"
import OtherFooter from "../../components/Footer/OtherFooter"
import NeighborRequest from "../../components/Header/NeighborRequest"
import styles from "./RoomPage.module.css"
import PopUp from "../../components/Room/RoomCustomPopUp/PopUp"
import SharePage from "../../components/Modal/Sharing/SharePage"
import SharingModalList from "../../components/Modal/Sharing/SharingModalList"

function RoomPage() {
  const [editMode, setEditMode] = useRecoilState(buildModeState)
  const [isMyRoom, setIsMyRoom] = useState(false)
  const [drag, setDrag] = useRecoilState(draggedItemState)
  const popUpStatus = useRecoilValue(popUpStatusAtom)
  const canvasRef = useRef()
  const [shareModal, setShareModal] = useState(false)
  console.log(canvasRef)
  useEffect(() => {
    fetchRoomData().then((response) => {
      if (response.data.isMyRoom) {
        setIsMyRoom(true)
      }
    })
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      {isMyRoom ? <NeighborRequest /> : <Share setShareModal={setShareModal} />}
      {shareModal && (
        <>
          <div
            className={styles.back}
            onClick={() => {
              setShareModal(false)
            }}
          />
          <SharePage shareModal={shareModal} canvasRef={canvasRef} />
          <SharingModalList />
        </>
      )}
      <div
        className={styles.button}
        onClick={() => {
          setEditMode(!editMode)
          if (drag) {
            setDrag(null)
          }
        }}
      >
        {editMode && <span>편집모드</span>}
        {!editMode && <span>관광모드</span>}
      </div>

      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ fov: 45 }}
        ref={canvasRef}
      >
        <color attach="background" args={["skyblue"]} />
        <Suspense
          fallback={
            <Html>
              <div>로딩중...</div>
            </Html>
          }
        >
          <Experience />
        </Suspense>
      </Canvas>
      {/* 랜덤 찾기 버튼 */}
      {isMyRoom ? <></> : <div className={styles.randomButton}>랜덤 방문</div>}
      {isMyRoom ? <MyFooter /> : <OtherFooter />}
      {/* {popUpStatus ? <PopUp/> : '' } */}
      <PopUp />
    </div>
  )
}

export default RoomPage
