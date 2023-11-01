// React
import React, { useState } from "react"
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
import RankingModal from "../../components/Modal/Ranking/RankingModal"

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

  // 랭킹모달 상태관리
  const [isRanking, setIsRanking] = useState(false)

  return (
    <>
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
          <PhysicsModel // 상
            position={[0, 0.005, -17]}
            rotation={[0, 0, 0]}
            size={[50, 0.3]}
          />
          <PhysicsModel //하
            position={[0, 0.005, 45]}
            rotation={[0, 0, 0]}
            size={[50, 0.3]}
          />
          <PhysicsModel //좌
            position={[-25, 0.005, 14]}
            rotation={[0, Math.PI / 2, 0]}
            size={[62, 0.3]}
          />
          <PhysicsModel //우
            position={[25, 0.005, 14]}
            rotation={[0, Math.PI / 2, 0]}
            size={[62, 0.3]}
          />

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
              adjustedAngle={[-4, 4, 4]}
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
              adjustedAngle={[2, 4, 4]}
              adjustedZoom={0.3}
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
              adjustedAngle={[14, 4, 1]}
              adjustedZoom={0.23}
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
              adjustedAngle={[0, 3, -8]}
              adjustedZoom={0.3}
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
              location={"house"}
              flag={"1"}
            />
          </div>
        )}
        {confirmEnteringPostOffice && (
          <div className={styles.confirmModal}>
            {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
            <ConfirmEnteringDefaultModal
              modalContent={
                "딩동 마을 주민들에게 편지를 보낼 수 있는 우체국을 준비 중입니다!"
              }
              setConfirmEnteringLocation={setConfirmEnteringPostOffice}
              location={"postOffice"}
              flag={"0"}
            />
          </div>
        )}
        {confirmEnteringStore && (
          <div className={styles.confirmModal}>
            {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
            <ConfirmEnteringDefaultModal
              modalContent={"집을 꾸밀 수 있는 가구 상점을 준비 중입니다!"}
              setConfirmEnteringLocation={setConfirmEnteringStore}
              location={"store"}
              flag={"0"}
            />
          </div>
        )}
        {confirmEnteringOtherRoom && (
          <div className={styles.confirmModal}>
            {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
            <ConfirmEnteringDefaultModal
              modalContent={"딩동 주민의 집을 구경하시겠습니까?"}
              setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
              location={"otherRoom"}
              flag={"1"}
            />
          </div>
        )}
        {confirmEnteringWorld && (
          <div className={styles.confirmModal}>
            {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
            <ConfirmEnteringDefaultModal
              modalContent={
                "딩동 주민들을 만날 수 있는 멀티 플레이 서비스를 준비중 입니다!"
              }
              setConfirmEnteringLocation={setConfirmEnteringWorld}
              location={"world"}
              flag={"0"}
            />
          </div>
        )}
      </div>

      {/* 랭킹모달 */}
      {isRanking && (
        <>
          <div className={styles.overlay} onClick={() => setIsRanking(false)} />
          <div className={styles.rankingModalContainer}>
            <div className={styles.rankingModal}>
              <RankingModal />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SingleMainPage
