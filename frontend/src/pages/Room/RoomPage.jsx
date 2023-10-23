import { Canvas } from "@react-three/fiber"
import Experience from "../../components/Room/Experience";
function RoomPage() {
  return (
    <>
      <Canvas shadows camera={{ position: [10, 10, 20], fov: 60 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default RoomPage;