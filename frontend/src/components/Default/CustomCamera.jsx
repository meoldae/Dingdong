import React, { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { useRecoilValue } from "recoil"
import { modelPositionAtom } from "../../atom/PlayerAtom"
import { DefaultPosition, DefaultZoom } from "../../atom/DefaultCamAtom"
import { ArriveAtom } from "../../atom/HouseCamAtom"

function lerp(start, end, factor) {
  return (1 - factor) * start + factor * end
}

function CustomCamera() {
  const modelPosition = useRecoilValue(modelPositionAtom)
  const cameraRef = useRef()
  const { size } = useThree()

  const defaultCamPosition = useRecoilValue(DefaultPosition)
  const zoomPoint = useRecoilValue(DefaultZoom)

  // ArriveAtom 값 확인
  const isArrived = useRecoilValue(ArriveAtom)

  // 현재 및 목표 위치 저장
  const currentPos = useRef([...defaultCamPosition])
  const targetPos = useRef([...defaultCamPosition])

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

  useFrame(() => {
    if (cameraRef.current && modelPosition) {
      if (isArrived) {
        targetPos.current = [
          modelPosition[0] + defaultCamPosition[0],
          modelPosition[1] + defaultCamPosition[1],
          modelPosition[2] + defaultCamPosition[2],
        ]

        const factor = 0.02
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
          modelPosition[0] + defaultCamPosition[0],
          modelPosition[1] + defaultCamPosition[1],
          modelPosition[2] + defaultCamPosition[2],
        ]
      }

      cameraRef.current.position.set(...currentPos.current)
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
      makeDefault
      position={defaultCamPosition}
      zoom={zoomPoint}
      near={0.5}
      far={20}
    />
  )
}

export default CustomCamera
