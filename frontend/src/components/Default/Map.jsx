import React from "react"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

function Map() {
  // 맵 텍스처 설정
  const texture = useTexture("assets/images/grid2.png")

  // 패턴 반복
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(10, 10)
  return (
    <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      {/* 맵 크기 */}
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default Map
