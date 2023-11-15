import React, { useRef, useEffect } from "react"
import * as THREE from "three"
import { FenceBoxAtom } from "../../../atom/FenceAtom"
import { useSetRecoilState } from "recoil"

const PhysicsModel = ({ position, rotation, size }) => {
  const meshRef = useRef()
  const setFenceBoxes = useSetRecoilState(FenceBoxAtom)

  useEffect(() => {
    if (meshRef.current) {
      const newFenceBox = new THREE.Box3().setFromObject(meshRef.current)
      setFenceBoxes((oldFenceBoxes) => [...oldFenceBoxes, newFenceBox])
    }
  }, [meshRef, setFenceBoxes])

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        visible={false}
        transparent
        opacity={0.2}
        // color={"red"}
      />
    </mesh>
  )
}

export default PhysicsModel
