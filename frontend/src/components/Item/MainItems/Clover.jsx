import { useRef, useState, useEffect } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRecoilValue } from "recoil"
import { modelPositionAtom } from "../../../atom/PlayerAtom"
import { gsap } from "gsap"

function Clover() {
  const modelPosition = useRecoilValue(modelPositionAtom)

  const meshRef = useRef()
  const cloverPosition = [0, 0, 3]
  const [startTime] = useState(Date.now())
  const [isVisible, setIsVisible] = useState(true)

  const gltf = useLoader(GLTFLoader, "assets/models/clover.glb")
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -0.3
      meshRef.current.rotation.y = 0.3
    }
  }, [meshRef])

  useFrame(() => {
    if (meshRef.current && isVisible) {
      const elapsedTime = (Date.now() - startTime) / 500
      meshRef.current.position.y =
        cloverPosition[1] + Math.sin(elapsedTime) * 0.3 // 움직일 높이

      const distance = Math.sqrt(
        (modelPosition[0] - cloverPosition[0]) ** 2 +
          (modelPosition[1] - cloverPosition[1]) ** 2 +
          (modelPosition[2] - cloverPosition[2]) ** 2
      )
      if (distance < 1) {
        setIsVisible(false)

        if (meshRef.current) {
          // meshRef의 존재 확인
          gsap.to(meshRef.current.position, {
            y: cloverPosition[1] + 2,
            duration: 0.5,
            onComplete: () => {
              if (meshRef.current && meshRef.current.material) {
                // meshRef와 material의 존재 확인
                gsap.to(meshRef.current.material, {
                  opacity: 0,
                  duration: 0.5,
                  onComplete: () => {
                    setIsVisible(false)
                  },
                })
              }
            },
          })
        }
      }
    }
  })

  return isVisible ? (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={cloverPosition}
      castShadow
    />
  ) : null
}

export default Clover
