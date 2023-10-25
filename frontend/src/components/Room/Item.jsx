import { useCursor, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useMemo, useState } from "react";
import { useGrid } from "./UseGrid";
import { useRecoilValue } from "recoil";
import { buildModeState } from "./Atom";

export const Item = ({
  item,
  onClick,
  isDragging,
  dragPosition,
  canDrop,
  dragRotation,
  wall,
}) => {
  const { name, gridPosition, size, rotation: itemRotation } = item;
  const rotation = isDragging ? dragRotation : itemRotation;
  const { scene } = useGLTF(`assets/models/roomitems/${name}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const width = rotation === 1 || rotation === 3 ? size[2] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[2];
  const thick = size[1];
  const { gridToVector3, wallLeftGridToVector3 } = useGrid();
  const [hover, setHover] = useState(false);
  const buildMode = useRecoilValue(buildModeState);
  useCursor(buildMode ? hover : undefined);
  
  return (
    <>
      {wall ? (
        <group
          onClick={onClick}
          position={wallLeftGridToVector3(
            isDragging ? dragPosition || gridPosition : gridPosition,
            width,
            height
          )}
        >
          <primitive
            object={clone}
            position-y={0.44}
            position-z={0.12}
            // 벽에 있는 아이템 관련
            rotation-y={(rotation * Math.PI) / 2}
          />
          {isDragging && (
            <mesh position-x={0.02} position-y={0.12} position-z={0.12}>
              <boxGeometry
                args={[0, (thick * 0.48) / 2, (height * 0.48) / 2]}
              />
              <meshBasicMaterial
                color={canDrop ? "green" : "red"}
                opacity={0.3}
                transparent
              />
            </mesh>
          )}
        </group>
      ) : (
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
          {/* 물체 클릭 시 바닥 면 가능 불가능 색상 및 회전 각 prop 받기 */}
          <primitive object={clone} rotation-y={(rotation * Math.PI) / 2} />
          {isDragging && (
            <mesh position-y={0.02}>
              <boxGeometry
                args={[(width * 0.48) / 2, 0, (height * 0.48) / 2]}
              />
              <meshBasicMaterial
                color={canDrop ? "green" : "red"}
                opacity={0.3}
                transparent
              />
            </mesh>
          )}
        </group>
      )}
    </>
  );
};
