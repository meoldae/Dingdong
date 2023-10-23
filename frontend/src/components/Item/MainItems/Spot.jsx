import React from "react"
// import { Mesh, PlaneGeometry, MeshStandardMaterial } from "@react-three/fiber";

function Spot() {
  return (
    <mesh position={[5, 0.005, 5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial color={"yellow"} transparent opacity={0.5} />
    </mesh>
  )
}

export default Spot
