import { useRef, useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { gsap } from "gsap"

function House({ isVisible, position }) {
  const gltf = useLoader(GLTFLoader, "assets/models/house.glb")
  const meshRef = useRef()

  useEffect(() => {
    if (isVisible) {
      gsap.to(meshRef.current.position, {
        y: -0.7,
        duration: 1,
        ease: "power2.out",
      })
    } else {
      gsap.to(meshRef.current.position, {
        y: position[1],
        duration: 1,
        ease: "power2.out",
      })
    }
  }, [isVisible, position])
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.1
    }
  }, [meshRef])

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={position}
      castShadow
    />
  )
}

export default House
