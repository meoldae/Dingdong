import { useCursor, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useMemo, useState } from "react";
import { useGrid } from "./UseGrid";
import { useRecoilState, useRecoilValue } from "recoil";
import { ItemRotateState, ItemsState, draggedItemState } from "./Atom";

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
  const { gridToVector3, wallLeftGridToVector3, wallRightGridToVector3 } =
    useGrid();
  const [items, setItems] = useRecoilState(ItemsState);
  const draggedItem = useRecoilValue(draggedItemState);
  const value = useRecoilValue(ItemRotateState);


  useEffect(() => {
    setItems((prev) => {
      const newItems = prev.map((item, index) => {
        if (index === draggedItem) {
          return {
            ...item,
            gridPosition: gridPosition,
            rotation: value,
          };
        }
        return item;
      });
      return newItems;
    });
  }, [value]);

  useEffect(()=>{
    rotation
  })

  return (
    <>
      {wall && (
        <group
          onClick={onClick}
          position={
             rotation
              ? wallLeftGridToVector3(
                  isDragging ? dragPosition || gridPosition : gridPosition
                )
              : wallRightGridToVector3(
                  isDragging ? dragPosition || gridPosition : gridPosition
                )
          }
        >
          <primitive
            object={clone}
            position-x={rotation? 0 : 0.12}
            position-y={0.44}
            position-z={0.12}
            // 벽에 있는 아이템 관련
            rotation-y={(rotation * Math.PI) / 2}
          />
          {isDragging && (
            <mesh
              position-x={rotation ? 0.02 : 0.12}
              position-y={0.12}
              position-z={0.13}
            >
              <boxGeometry
                args={[
                  rotation ? 0 : (width * 0.48) / 2,
                  (thick * 0.48) / 2,
                  rotation ? (height * 0.48) / 2 : 0,
                ]}
              />
              <meshBasicMaterial
                color={canDrop ? "green" : "red"}
                opacity={0.5}
                transparent
              />
            </mesh>
          )}
        </group>
      )}

      {!wall && (
        <group
        onPointerLeave={onClick}
          position={gridToVector3(
            isDragging ? dragPosition || gridPosition : gridPosition,

          )}
        >
          {/* 물체 클릭 시 바닥 면 가능 불가능 색상 및 회전 각 prop 받기 */}
          <primitive object={clone} rotation-y={(rotation * Math.PI) / 2} />
          {isDragging && (
            <mesh position-y={0.02}>
              <boxGeometry
                args={[(width * 0.48) / 2, 0.01, (height * 0.48) / 2]}
              />
              <meshBasicMaterial
                color={canDrop ? "green" : "red"}
                opacity={0.5}
                transparent
              />
            </mesh>
          )}
        </group>
      )}
    </>
  );
};
