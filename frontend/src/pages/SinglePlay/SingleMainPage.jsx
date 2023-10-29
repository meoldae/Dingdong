// React
import React from "react"
import styles from "./SingleMainPage.module.css"

// Recoil
import { useRecoilValue } from "recoil"
import { ConfirmEnteringRoomAtom } from "../../atom/SinglePlayAtom"
import { RoomPortalVisibleAtom } from "../../atom/SinglePlayAtom"

// Three.js 기본 세팅
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CustomCamera from "../../components/Default/CustomCamera"
import DirectionalLight from "../../components/Default/DirectionLight"
import Map from "../../components/Default/Map"

// Three.js
import Model from "../../components/Item/MainItems/Character"
import House from "../../components/Item/MainItems/tempItems/House"
import Spot from "../../components/Item/MainItems/tempItems/Spot"

// 각 건물 포탈
import RoomPortal from "../../components/Item/MainItems/Portals/RoomPortal"
import RoomPortalRing from "../../components/Item/MainItems/Portals/RoomPortalRing"

// React 컴포넌트
import ConfirmEnteringRoomModal from "../../components/Modal/Confirm/ConfirmEnteringRoomModal"
import PhysicsModel from "../../components/Item/MainItems/PhysicsModel"

const SingleMainPage = () => {
  // 마이룸 입장 모달
  const confirmEnteringRoom = useRecoilValue(ConfirmEnteringRoomAtom)

  // 마이룸 입장 포탈
  const roomPortalVisible = useRecoilValue(RoomPortalVisibleAtom)

  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows>
        {/* 사용자가 화면을 확대하거나 회전하지 못하도록 설정 */}
        <OrbitControls />
        {/* <OrbitControls enableZoom={false} enableRotate={false} /> */}

        {/* 전체 밝기 */}
        <ambientLight intensity={1.3} />

        {/* 그림자 조명 */}
        <DirectionalLight />

        {/* 카메라 */}
        <CustomCamera />

        {/* 화면 바탕 */}
        <Map />

        {/* 객체 */}
        <Model />
        {/* <Spot /> */}
        {/* <House /> */}
        <PhysicsModel />

        {/* 포탈 */}
        {roomPortalVisible ? <RoomPortal /> : <RoomPortalRing />}
      </Canvas>

      {/* 입장 확인 모달 */}
      {confirmEnteringRoom && (
        <div className={styles.roomConfirmModal}>
          {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
          <ConfirmEnteringRoomModal
            modalContent={"마이룸에 입장하시겠습니까?"}
          />
        </div>
      )}
    </div>
  )
}

export default SingleMainPage
