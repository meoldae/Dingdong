import React, { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CustomCamera from "../../components/Default/CustomCamera"
import DirectionalLight from "../../components/Default/DirectionLight"
import Map from "../../components/Default/Map"
import Model from "../../components/Item/PlayerItems/Model"
import House from "../../components/Item/MainItems/House"
import Spot from "../../components/Item/MainItems/Spot"
import "./MainPage.css"

// Spot 위치 및 크기 설정
const SPOT_POSITION = [5, 0, 5]
const SPOT_SIZE = [3, 3] // Spot의 크기

function MainPage() {
  const [modelPosition, setModelPosition] = useState([0, 0, 0])
  const [isHouseVisible, setIsHouseVisible] = useState(false)

  useEffect(() => {
    // Spot 사각형 영역 내부에 있는지 확인
    const isInsideX =
      Math.abs(SPOT_POSITION[0] - modelPosition[0]) <= SPOT_SIZE[0] / 2
    const isInsideZ =
      Math.abs(SPOT_POSITION[2] - modelPosition[2]) <= SPOT_SIZE[1] / 2
    const isInside = isInsideX && isInsideZ

    setIsHouseVisible(isInside)
  }, [modelPosition])

  return (
    <div id="canvas-container">
      <Canvas shadows>
        {/* 사용자가 화면을 확대하거나 회전하지 못하도록 설정 */}
        <OrbitControls enableZoom={false} enableRotate={false} />

        {/* 전체 밝기 */}
        <ambientLight intensity={1} />

        {/* 그림자 조명 */}
        <DirectionalLight />

        {/* 카메라 */}
        <CustomCamera modelPosition={modelPosition} />

        {/* 화면 바탕 */}
        <Map />

        {/* 객체 */}
        <Model setModelPosition={setModelPosition} />
        <Spot />
        <House isVisible={isHouseVisible} position={[5, -4, 2]} />
      </Canvas>
    </div>
  )
}

export default MainPage
