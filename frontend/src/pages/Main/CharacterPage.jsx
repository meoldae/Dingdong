import React, { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CustomCamera from "../../components/Default/CustomCamera"
import DirectionalLight from "../../components/Default/DirectionLight"
import Map from "../../components/Default/Map"
import Model from "../../components/Item/PlayerItems/Model"
import House from "../../components/Item/MainItems/House"
import Spot from "../../components/Item/MainItems/Spot"
import "./CharacterPage.css"
import TempMap from "../../components/Default/TempMap"
import HouseCamPoint from "../../components/Item/MainItems/HouseCamPoint"
import RoomConfirmModal from "../../components/Modal/Confirm/RoomConfirmModal"
import { useRecoilValue } from "recoil"
import { RoomConfirmAtom } from "../../atom/RoomConfirmAtom"
import None from "../../components/Item/MainItems/None"
import { HousePointVisibleAtom } from "../../atom/HousePointVisible"
import None2 from "../../components/Item/MainItems/None2"
function MainPage() {
  const RoomConfirmVisible = useRecoilValue(RoomConfirmAtom)
  const HousePointVisible = useRecoilValue(HousePointVisibleAtom)
  return (
    <div id="canvas-container">
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
        <TempMap />

        {/* 객체 */}
        <Model />
        <Spot />
        <House />
        <None />
        {HousePointVisible ? <HouseCamPoint /> : <None2 />}
      </Canvas>
      {RoomConfirmVisible ? (
        <div className="roomConfirmModal">
          <RoomConfirmModal />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default MainPage
