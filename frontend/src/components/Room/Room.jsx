import { useGLTF } from "@react-three/drei";

export const Room = ({ name }) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const { scene } = useGLTF(`${urlPath}/assets/models/furnitureItems/${name}.glb`);
  return (
    <primitive
      object={scene}
      position-y={-0.22}
      rotation-y={Math.PI / 4}
    position-z={-0.1}
    position-x={-0.1}
    scale={[1,1.0105,1]}
    />
  );
};
