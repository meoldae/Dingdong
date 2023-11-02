// React
import React, { useEffect, useState } from "react"
import styles from "./SingleMainPage.module.css"
import { motion } from "framer-motion"

// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  ArriveAtom,
  ConfirmEnteringOtherRoomAtom,
  ConfirmEnteringPostOfficeAtom,
  ConfirmEnteringRankAtom,
  ConfirmEnteringRoomAtom,
  ConfirmEnteringStoreAtom,
  ConfirmEnteringWorldAtom,
  OtherRoomPortalPositionAtom,
  OtherRoomPortalVisibleAtom,
  PostOfficePortalPositionAtom,
  PostOfficePortalVisibleAtom,
  RankPortalPositionAtom,
  RankPortalVisibleAtom,
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
import { DefaultPosition, DefaultZoom } from "../../atom/DefaultSettingAtom"
import {
  postofficeCardAtom,
  postofficeSendLetterAtom,
} from "../../atom/PostAtom"
import PostofficeCardBox from "../Postoffice/PostofficeCardBox"
import PostofficeSendLetter from "../Postoffice/PostofficeSendLetter"
import GuidePage from "../../components/UI/GuidePage"
const SingleMainPage = () => {
  // 카메라 설정
  const setDefaultCameraPosition = useSetRecoilState(DefaultPosition)
  const setDefaultCameraZoom = useSetRecoilState(DefaultZoom)

  // 도착 여부
  const setIsArrived = useSetRecoilState(ArriveAtom)

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
  // const [confirmEnteringWorld, setConfirmEnteringWorld] = useRecoilState(
  //   ConfirmEnteringWorldAtom
  // )
  const [confirmEnteringRank, setConfirmEnteringRank] = useRecoilState(
    ConfirmEnteringRankAtom
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
  // const [worldPortalVisible, setWorldPortalVisible] = useRecoilState(
  //   WorldPortalVisibleAtom
  // )
  const [rankPortalVisible, setRankPortalVisible] = useRecoilState(
    RankPortalVisibleAtom
  )

  // 포탈 위치
  const roomPortalPosition = useRecoilValue(RoomPortalPositionAtom)
  const postOfficePortalPosition = useRecoilValue(PostOfficePortalPositionAtom)
  const storePortalPosition = useRecoilValue(StorePortalPositionAtom)
  const otherRoomPortalPosition = useRecoilValue(OtherRoomPortalPositionAtom)
  // const worldPortalPosition = useRecoilValue(WorldPortalPositionAtom)
  const rankPortalPosition = useRecoilValue(RankPortalPositionAtom)

  // 랭킹모달 상태관리
  const closeRanking = () => {
    setIsArrived(false)
    setConfirmEnteringRank(false)
    setDefaultCameraPosition([2, 10, 10])
    setDefaultCameraZoom(0.18)
  }

  // 우체국 도착 상태관리
  const [onPostofficeCard, setOnPostOfficeCard] =
    useRecoilState(postofficeCardAtom)
  const [onPostofficeSendLetter, setOnPostofficeSendLetter] = useRecoilState(
    postofficeSendLetterAtom
  )
  const [selectedPostCard, setSelectedPostCard] = useState(null)

  const handleSelectButtonClick = (selectedCard) => {
    setSelectedPostCard(selectedCard)
    setOnPostOfficeCard(false)
    setOnPostofficeSendLetter(true)
  }
  const [guide, setGuide] = useState(true)
  // 가이드 관리
  useEffect(() => {
    if (localStorage.getItem("guideVisible")) {
      setGuide(false)
    }
  }, [])

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

          {/* 경계 */}
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

          {/* {worldPortalVisible ? (
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
          )} */}

          {rankPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringRank}
              portalPosition={rankPortalPosition}
              setPortalVisible={setRankPortalVisible}
              adjustedAngle={[0, 3, -8]}
              adjustedZoom={0.4}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={rankPortalPosition}
              portalVisible={setRankPortalVisible}
            />
          )}
        </Canvas>
        {/* 가이드 페이지 */}
        {guide && (
          <GuidePage
            onClick={() => {
              localStorage.setItem("guideVisible", true)
              setGuide(false)
            }}
          />
        )}

        {/* 입장 확인 모달 */}
        {confirmEnteringRoom && (
          <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"우리집에 입장하시겠습니까?"}
                setConfirmEnteringLocation={setConfirmEnteringRoom}
                location={"house"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringPostOffice && (
          <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"당신의 마음이 담긴 편지를 전달하시겠습니까?"}
                setConfirmEnteringLocation={setConfirmEnteringPostOffice}
                location={"postOffice"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringStore && (
          <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"집을 꾸밀 수 있는 가구 상점을 준비 중입니다!"}
                setConfirmEnteringLocation={setConfirmEnteringStore}
                location={"store"}
                flag={"0"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringOtherRoom && (
          <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 주민의 집을 구경하시겠습니까?"}
                setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
                location={"otherRoom"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {/* 멀티 플레이 포탈 */}
        {/* {confirmEnteringWorld && (
          <div className={styles.confirmModal}>
    
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
        {/* 우체국모달 */}
        {onPostofficeCard && (
          <>
            <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
              <div className={styles.postofficemodalcontainer}>
                <PostofficeCardBox
                  onSelectButtonClick={handleSelectButtonClick}
                />
              </div>
            </motion.div>
          </>
        )}
        {onPostofficeSendLetter && (
          <>
            <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
              <div className={styles.postofficemodalcontainer}>
                <PostofficeSendLetter card={selectedPostCard} />
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* 랭킹모달 */}
      {confirmEnteringRank && (
        <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: 0.5, duration: 0.5}}>
          <div className={styles.overlay} onClick={() => closeRanking()} />
          <div className={styles.rankingModalContainer}>
            <RankingModal />
          </div>
        </motion.div>
      )}
    </>
  )
}

export default SingleMainPage
