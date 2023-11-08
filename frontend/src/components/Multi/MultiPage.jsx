import { Canvas } from "@react-three/fiber"
import CreateMulti from "./CreateMulti"
import { Experience } from "./Experience"

export const MultiPage = () => {
  return (
    <>
      <CreateMulti />
      <Canvas shadows camera={{ position: [2, 10, 10], fov: 30 }}>
        <Experience />
      </Canvas>
    </>
  )
}
