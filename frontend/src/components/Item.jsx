import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useMemo } from "react";
import { useGrid } from "./UseGrid";

export const Item = ({ item, onClick, isDragging, dragPosition, canDrop }) => {
  const { name, gridPosition, size, rotation } = item;
  const { scene } = useGLTF(`models/items/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];
  const { gridToVector3 } = useGrid();
  return (
    <group
      onClick={onClick}
      position={gridToVector3(
        isDragging ? dragPosition || gridPosition : gridPosition,
        width,
        height
      )}
    >
      <primitive object={clone} />
      {isDragging && (
        <mesh
        position-y={0.05}>
          <boxGeometry
            args={[width , 0, height ]}
          />
          <meshBasicMaterial
            color={canDrop ? "green" : "red"}
            opacity={0.3}
            transparent
          />
        </mesh>
      )}
    </group>
  );
};
