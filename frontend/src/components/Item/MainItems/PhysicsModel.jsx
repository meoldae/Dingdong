import React, { useRef } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const PhysicsModel = () => {
  const characterRef = useRef()
  const character = useLoader(GLTFLoader, "assets/models/characters/f_1.glb")
  const modelPosition = [-3, 0, 0]

  return (
    <primitive
      ref={characterRef}
      object={character.scene}
      position={modelPosition}
    />
  )
}

export default PhysicsModel
