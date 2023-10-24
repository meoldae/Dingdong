import React, { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { useRecoilValue } from "recoil"
import { modelPositionAtom } from "../../atom/PlayerAtom"

function CustomCamera() {
  const modelPosition = useRecoilValue(modelPositionAtom)
  // 카메라 참조
  const cameraRef = useRef()

  // 현재 캔버스의 너비와 높이
  const { size } = useThree()

  // 초기 카메라 위치 설정
  const position = [1, 3, 5]

  useEffect(() => {
    if (cameraRef.current) {
      // 캔버스의 가로/세로 비율 계산
      const aspectRatio = size.width / size.height

      // orthographic camera의 클리핑 영역 설정
      cameraRef.current.left = -1 * aspectRatio
      cameraRef.current.right = 1 * aspectRatio
      cameraRef.current.top = 1
      cameraRef.current.bottom = -1
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size])

  // frame마다 카메라의 위치와 방향을 업데이트
  useFrame(() => {
    if (cameraRef.current && modelPosition) {
      const position = [
        modelPosition[0] + 1,
        modelPosition[1] + 5,
        modelPosition[2] + 5,
      ]

      // 카메라의 위치 설정
      cameraRef.current.position.set(...position)

      // 카메라가 모델을 향하도록 방향 설정
      cameraRef.current.lookAt(
        modelPosition[0],
        modelPosition[1],
        modelPosition[2]
      )
    }
  })

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault // 기본 카메라로 설정
      position={position} // 카메라 초기 위치 설정
      zoom={0.18}
      // 카메라의 가시 범위 설정
      near={0.5}
      far={20}
    />
  )
}

export default CustomCamera
