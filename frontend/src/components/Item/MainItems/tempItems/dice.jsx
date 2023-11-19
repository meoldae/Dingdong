import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

import useDiceClone from "./useDiceClone"

const Dice = ({ actionId, rollResult }) => {
  if (actionId != 4) {
    return null
  } else {
    const meshRef = useRef()
    const urlPath = import.meta.env.VITE_APP_ROUTER_URL
    const dicePosition = [0, 2.5, 0]
    const diceClone = useDiceClone(`${urlPath}/assets/models/tempGlb/dice2.glb`)
    // 회전 시작 시간
    const rotationStartTime = useRef(0)

    //  회전 시작 시간 초기화
    useEffect(() => {
      rotationStartTime.current = window.performance.now()
    }, [])

    // 주사위 회전
    useFrame(() => {
      const rotationStopTime =
        window.performance.now() - rotationStartTime.current

      if (meshRef.current) {
        // 주어진 회전 속도로 회전

        meshRef.current.rotation.x += 0.4
        meshRef.current.rotation.z -= 0.4

        // 주사위 정지
        if (rotationStopTime > 2000) {
          meshRef.current.rotation.x = 0
          meshRef.current.rotation.z = 0
          // 주사위 눈에 따라 회전 방향 설정
          if (rollResult === 1) {
            meshRef.current.rotation.x = 0
            meshRef.current.rotation.z = 0
          } else if (rollResult === 2) {
            meshRef.current.rotation.x = Math.PI / 2
          } else if (rollResult === 3) {
            meshRef.current.rotation.z = -Math.PI / 2
          } else if (rollResult === 4) {
            meshRef.current.rotation.z = Math.PI / 2
          } else if (rollResult === 5) {
            meshRef.current.rotation.x = -Math.PI / 2
          } else if (rollResult === 6) {
            meshRef.current.rotation.x = Math.PI
          }
        }
      }
    })

    return (
      <primitive
        ref={meshRef}
        object={diceClone}
        position={dicePosition}
        scale={[0.4, 0.4, 0.4]}
        castShadow
      />
    )
  }
}

export default Dice
