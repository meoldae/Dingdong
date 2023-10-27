import { useRef, useState, useEffect } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"
import { gsap } from "gsap"
import { isPickedAtom } from "../../../../atom/TutorialAtom"

const useAnimatedModel = (
  modelPath,
  initialPosition,
  initialScale = [1, 1, 1]
) => {
  const characterPosition = useRecoilValue(CharacterPositionAtom)
  const setIsPicked = useSetRecoilState(isPickedAtom)
  const meshRef = useRef()
  const [startTime] = useState(Date.now())
  const [isVisible, setIsVisible] = useState(true)

  const gltf = useLoader(GLTFLoader, modelPath)

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -0.3
      meshRef.current.rotation.y = 0.3
      meshRef.current.scale.set(...initialScale)
    }
  }, [meshRef, initialScale])

  useFrame(() => {
    if (meshRef.current && isVisible) {
      const elapsedTime = (Date.now() - startTime) / 500
      meshRef.current.position.y =
        initialPosition[1] + Math.sin(elapsedTime) * 0.3

      const distance = Math.sqrt(
        (characterPosition[0] - initialPosition[0]) ** 2 +
          (characterPosition[1] - initialPosition[1]) ** 2 +
          (characterPosition[2] - initialPosition[2]) ** 2
      )

      if (distance < 1) {
        setIsPicked(true)
        meshRef.current.position.y = initialPosition[1] + 1.2
        meshRef.current.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false
            child.receiveShadow = false
          }
        })
        const targetScaleChange = [0.5, 0.5, 0.5] // 원하는 절대적인 스케일 변화량

        gsap.to(meshRef.current.scale, {
          x: initialScale[0] + targetScaleChange[0],
          y: initialScale[1] + targetScaleChange[1],
          z: initialScale[2] + targetScaleChange[2],
          duration: 0.2,
          onComplete: () => {
            if (meshRef.current) {
              meshRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                  child.material.transparent = true
                  gsap.to(child.material, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                      gsap.delayedCall(1, () => {
                        setIsPicked(false)
                        setIsVisible(false)
                      })
                    },
                  })
                }
              })
            }
          },
        })
      }
    }
  })

  return {
    isVisible,
    meshRef,
    gltf,
    position: initialPosition,
  }
}

export default useAnimatedModel
