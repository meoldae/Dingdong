import React from "react"
import styles from "./PhysicsTestPage.module.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CustomCamera from "../../components/Default/CustomCamera"
import DirectionalLight from "../../components/Default/DirectionLight"
import Map from "../../components/Default/Map"
import Charater from "../../components/Item/MainItems/Character"
import PhysicsModel from "../../components/Item/MainItems/PhysicsModel"

const PhysicsTestPage = () => {
  return (
    <div className={styles.canvasContainer}>
      <Canvas shadows>
        {/* 사용자가 화면을 확대하거나 회전하지 못하도록 설정 */}
        <OrbitControls enableZoom={false} enableRotate={false} />

        {/* 전체 밝기 */}
        <ambientLight intensity={1.3} />

        {/* 그림자 조명 */}
        <DirectionalLight />

        {/* 카메라 */}
        <CustomCamera />

        {/* 화면 바탕 */}
        <Map />

        {/* 객체 */}
        <Charater />
        <PhysicsModel />
      </Canvas>
    </div>
  )
}

export default PhysicsTestPage
