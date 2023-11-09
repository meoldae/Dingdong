import { Canvas } from "@react-three/fiber"
import CreateMulti from "./SocketManager"
import { MultiRender } from "./MultiRender"

export const MultiPage = () => {
  return (
    <>
      <CreateMulti />
      <Canvas shadows camera={{ position: [2, 10, 10], fov: 30 }}>
        <MultiRender />
      </Canvas>
    </>
  )
}
