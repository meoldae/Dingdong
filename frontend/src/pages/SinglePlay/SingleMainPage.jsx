// React
import React from "react"
import styles from "./SingleMainPage.module.css"

// Recoil
import { useRecoilState, useRecoilValue } from "recoil"
import {
  ConfirmEnteringOtherRoomAtom,
  ConfirmEnteringPostOfficeAtom,
  ConfirmEnteringRoomAtom,
  ConfirmEnteringStoreAtom,
  ConfirmEnteringWorldAtom,
  OtherRoomPortalPositionAtom,
  OtherRoomPortalVisibleAtom,
  PostOfficePortalPositionAtom,
  PostOfficePortalVisibleAtom,
  RoomPortalPositionAtom,
  StorePortalPositionAtom,
  StorePortalVisibleAtom,
  WorldPortalPositionAtom,
  WorldPortalVisibleAtom,
} from "../../atom/SinglePlayAtom"
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
import DefaultPortal from "../../components/Item/MainItems/Portals/DefaultPortal"
import DefaultPortalRing from "../../components/Item/MainItems/Portals/DefaultPortalRing"

// React 컴포넌트

import ConfirmEnteringDefaultModal from "../../components/Modal/Confirm/ConfirmEnteringDefaultModal"
import PhysicsModel from "../../components/Item/MainItems/PhysicsModel"

const SingleMainPage = () => {
  // 장소 입장 확인 여부
  const [confirmEnteringRoom, setConfirmEnteringRoom] = useRecoilState(
    ConfirmEnteringRoomAtom
  )
  const [confirmEnteringPostOffice, setConfirmEnteringPostOffice] =
    useRecoilState(ConfirmEnteringPostOfficeAtom)
  const [confirmEnteringStore, setConfirmEnteringStore] = useRecoilState(
    ConfirmEnteringStoreAtom
  )
  const [confirmEnteringOtherRoom, setConfirmEnteringOtherRoom] =
    useRecoilState(ConfirmEnteringOtherRoomAtom)
  const [confirmEnteringWorld, setConfirmEnteringWorld] = useRecoilState(
    ConfirmEnteringWorldAtom
  )

  // 포탈 생성 여부
  const [roomPortalVisible, setRoomPortalVisible] = useRecoilState(
    RoomPortalVisibleAtom
  )
  const [postOfficePortalVisible, setPostOfficePortalVisible] = useRecoilState(
    PostOfficePortalVisibleAtom
  )
  const [storePortalVisible, setStorePortalVisible] = useRecoilState(
    StorePortalVisibleAtom
  )
  const [otherRoomPortalVisible, setOtherRoomPortalVisible] = useRecoilState(
    OtherRoomPortalVisibleAtom
  )
  const [worldPortalVisible, setWorldPortalVisible] = useRecoilState(
    WorldPortalVisibleAtom
  )

  // 포탈 위치
  const roomPortalPosition = useRecoilValue(RoomPortalPositionAtom)
  const postOfficePortalPosition = useRecoilValue(PostOfficePortalPositionAtom)
  const storePortalPosition = useRecoilValue(StorePortalPositionAtom)
  const otherRoomPortalPosition = useRecoilValue(OtherRoomPortalPositionAtom)
  const worldPortalPosition = useRecoilValue(WorldPortalPositionAtom)

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
        {roomPortalVisible ? (
          <DefaultPortal
            setConfirmEnteringLocation={setConfirmEnteringRoom}
            portalPosition={roomPortalPosition}
            setPortalVisible={setRoomPortalVisible}
            adjustedAngle={[16, 5, 1]}
            adjustedZoom={0.24}
          />
        ) : (
          <DefaultPortalRing
            portalPosition={roomPortalPosition}
            portalVisible={setRoomPortalVisible}
          />
        )}

        {postOfficePortalVisible ? (
          <DefaultPortal
            setConfirmEnteringLocation={setConfirmEnteringPostOffice}
            portalPosition={postOfficePortalPosition}
            setPortalVisible={setPostOfficePortalVisible}
            adjustedAngle={[16, 5, 1]}
            adjustedZoom={0.24}
          />
        ) : (
          <DefaultPortalRing
            portalPosition={postOfficePortalPosition}
            portalVisible={setPostOfficePortalVisible}
          />
        )}

        {storePortalVisible ? (
          <DefaultPortal
            setConfirmEnteringLocation={setConfirmEnteringStore}
            portalPosition={storePortalPosition}
            setPortalVisible={setStorePortalVisible}
            adjustedAngle={[16, 5, 1]}
            adjustedZoom={0.24}
          />
        ) : (
          <DefaultPortalRing
            portalPosition={storePortalPosition}
            portalVisible={setStorePortalVisible}
          />
        )}

        {otherRoomPortalVisible ? (
          <DefaultPortal
            setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
            portalPosition={otherRoomPortalPosition}
            setPortalVisible={setOtherRoomPortalVisible}
            adjustedAngle={[16, 5, 1]}
            adjustedZoom={0.24}
          />
        ) : (
          <DefaultPortalRing
            portalPosition={otherRoomPortalPosition}
            portalVisible={setOtherRoomPortalVisible}
          />
        )}

        {worldPortalVisible ? (
          <DefaultPortal
            setConfirmEnteringLocation={setConfirmEnteringWorld}
            portalPosition={worldPortalPosition}
            setPortalVisible={setWorldPortalVisible}
            adjustedAngle={[16, 5, 1]}
            adjustedZoom={0.24}
          />
        ) : (
          <DefaultPortalRing
            portalPosition={worldPortalPosition}
            portalVisible={setWorldPortalVisible}
          />
        )}
      </Canvas>

      {/* 입장 확인 모달 */}
      {confirmEnteringRoom && (
        <div className={styles.confirmModal}>
          {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
          <ConfirmEnteringDefaultModal
            modalContent={"우리집에 입장하시겠습니까?"}
            setConfirmEnteringLocation={setConfirmEnteringRoom}
          />
        </div>
      )}
      {confirmEnteringPostOffice && (
        <div className={styles.confirmModal}>
          {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
          <ConfirmEnteringDefaultModal
            modalContent={"우체국에 입장하시겠습니까?"}
            setConfirmEnteringLocation={setConfirmEnteringPostOffice}
          />
        </div>
      )}
      {confirmEnteringStore && (
        <div className={styles.confirmModal}>
          {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
          <ConfirmEnteringDefaultModal
            modalContent={"준비중"}
            setConfirmEnteringLocation={setConfirmEnteringStore}
          />
        </div>
      )}
      {confirmEnteringOtherRoom && (
        <div className={styles.confirmModal}>
          {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
          <ConfirmEnteringDefaultModal
            modalContent={"다른 유저의 집을 구경하시겠습니까?"}
            setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
          />
        </div>
      )}
      {confirmEnteringWorld && (
        <div className={styles.confirmModal}>
          {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
          <ConfirmEnteringDefaultModal
            modalContent={"준비중"}
            setConfirmEnteringLocation={setConfirmEnteringWorld}
          />
        </div>
      )}
    </div>
  )
}

export default SingleMainPage
