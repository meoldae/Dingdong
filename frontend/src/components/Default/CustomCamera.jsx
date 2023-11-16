import React, { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { useRecoilValue } from "recoil"
import {
  CharacterPositionAtom,
  DefaultPosition,
  DefaultZoom,
} from "../../atom/DefaultSettingAtom"
import { ArriveAtom } from "../../atom/SinglePlayAtom"

// 선형 보간
const lerp = (start, end, factor) => {
  return (1 - factor) * start + factor * end
}

const CustomCamera = () => {
  const cameraRef = useRef()
  const { size } = useThree()

  const characterPosition = useRecoilValue(CharacterPositionAtom)
  const defaultCameraPosition = useRecoilValue(DefaultPosition)
  const defaultCameraZoom = useRecoilValue(DefaultZoom)

  const localStorageKey = "characterPosition"
  const storedPosition = JSON.parse(
    sessionStorage.getItem(localStorageKey)
  ) || [0, 0, 0]

  // 각 건물 포탈에서 움직임 제어
  const isArrived = useRecoilValue(ArriveAtom)

  // 현재 및 목표 위치 저장
  const currentPos = useRef([...defaultCameraPosition])
  const targetPos = useRef([...defaultCameraPosition])
  // 화면 사이즈 측정
  useEffect(() => {
    if (cameraRef.current) {
      const aspectRatio = size.width / size.height
      cameraRef.current.left = -1 * aspectRatio
      cameraRef.current.right = 1 * aspectRatio
      cameraRef.current.top = 1
      cameraRef.current.bottom = -1
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size])

  // 카메라 속성
  useFrame(() => {
    if (cameraRef.current && characterPosition) {
      // 건물 도착했을 때 카메라 각도 조정(선형 보간)
      if (isArrived) {
        targetPos.current = [
          characterPosition[0] + defaultCameraPosition[0],
          characterPosition[1] + defaultCameraPosition[1],
          characterPosition[2] + defaultCameraPosition[2],
        ]

        const factor = 0.04 // 카메라 전환 속도 (값 : 0 ~ 1, 1로 갈수록 빠름)
        currentPos.current[0] = lerp(
          currentPos.current[0],
          targetPos.current[0],
          factor
        )
        currentPos.current[1] = lerp(
          currentPos.current[1],
          targetPos.current[1],
          factor
        )
        currentPos.current[2] = lerp(
          currentPos.current[2],
          targetPos.current[2],
          factor
        )
      } else {
        currentPos.current = [
          storedPosition[0] + defaultCameraPosition[0],
          storedPosition[1] + defaultCameraPosition[1],
          storedPosition[2] + defaultCameraPosition[2],
        ]
      }

      cameraRef.current.position.set(...currentPos.current)
      cameraRef.current.lookAt(
        storedPosition[0],
        storedPosition[1],
        storedPosition[2]
      )
    }
  })

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={defaultCameraPosition}
      zoom={defaultCameraZoom}
      near={0.5}
      far={40}
    />
  )
}

export default CustomCamera
