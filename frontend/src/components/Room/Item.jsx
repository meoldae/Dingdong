import { useCursor, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useMemo, useState } from "react";
import { useGrid } from "./UseGrid";
import { useRecoilValue } from "recoil";
import {  buildModeState } from "./Atom";

export const Item = ({ item, onClick, isDragging, dragPosition, canDrop }) => {
  const { name, gridPosition, size, rotation } = item;
  const { scene } = useGLTF(`assets/models/roomitems/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];
  const { gridToVector3 } = useGrid();
  
  const [hover, setHover] = useState(false);
  const buildMode = useRecoilValue(buildModeState);
  useCursor(buildMode ? hover : undefined);
  return (
    <group
      onClick={onClick}
      position={gridToVector3(
        isDragging ? dragPosition || gridPosition : gridPosition,
        width,
        height
      )}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <primitive object={clone} />
      {isDragging && (
        <mesh
        position-y={0.02}>
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
