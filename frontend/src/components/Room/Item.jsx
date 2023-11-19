import { useCursor, useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three-stdlib"
import { useEffect, useMemo, useRef, useState } from "react"
import { useGrid } from "./UseGrid"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  ItemRotateState,
  ItemsState,
  draggedItemState,
  mobileCheckState,
} from "./Atom"
import { LinearFilter, MeshToonMaterial, MeshBasicMaterial } from "three"

export const Item = ({
  item,
  onClick,
  isDragging,
  dragPosition,
  canDrop,
  draggedItemRotation,
}) => {
  const {
    furnitureId,
    position: gridPosition,
    size,
    rotation: itemRotation,
    categoryId,
  } = item
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const rotation = isDragging ? draggedItemRotation : itemRotation
  const { scene } = useGLTF(
    `${urlPath}/assets/models/furnitureItems/${furnitureId}.glb`,
    true
  )
  scene.children[0].castShadow = true

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const width = rotation === 1 || rotation === 3 ? size[2] : size[0]
  const height = rotation === 1 || rotation === 3 ? size[0] : size[2]
  const thick = size[1]
  const { gridToVector3, wallLeftGridToVector3, wallRightGridToVector3 } =
    useGrid()
  const [items, setItems] = useRecoilState(ItemsState)
  const draggedItem = useRecoilValue(draggedItemState)
  const value = useRecoilValue(ItemRotateState)
  const mobileCheck =
    /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material && child.material.map) {
        child.material.map.minFilter = LinearFilter
        child.material.map.magFilter = LinearFilter
        child.material.map.needsUpdate = true
      }
    })
  }, [scene])
  // 아이템 배친
  useEffect(() => {
    setItems((prev) => {
      const newItems = prev.map((item, index) => {
        if (item.categoryId === 3) {
          if (index === draggedItem) {
            return {
              ...item,
              position: gridPosition,
              rotation: draggedItemRotation,
            }
          }
        }
        return item
      })
      return newItems
    })
  }, [value])

  return (
    <>
      {categoryId === 3 &&
        (mobileCheck ? (
          <group
            onPointerMove={onClick}
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
              receiveShadow
              castShadow
              // position-x={rotation ? 0 : 0.12}
              position-y={0.44}
              position-z={rotation ? 0 : 0.12}
              // 벽에 있는 아이템 관련
              rotation-y={(rotation * Math.PI) / 2}
            />
            {isDragging && (
              <mesh
                position-x={rotation ? 0.02 : 0}
                position-y={0.12}
                position-z={rotation ? 0 : 0.13}
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
        ) : (
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
              receiveShadow
              castShadow
              object={clone}
              // position-x={rotation ? 0 : 0.12}
              position-y={0.44}
              position-z={rotation ? 0 : 0.12}
              // 벽에 있는 아이템 관련
              rotation-y={(rotation * Math.PI) / 2}
            ></primitive>
            {isDragging && (
              <mesh
                position-x={rotation ? 0.02 : 0}
                position-y={0.12}
                position-z={rotation ? 0 : 0.13}
              >
                <boxGeometry
                  args={[
                    rotation ? 0 : width * 0.24,
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
        ))}

      {categoryId !== 3 &&
        (mobileCheck ? (
          <group
            onPointerMove={onClick}
            position={gridToVector3(
              isDragging ? dragPosition || gridPosition : gridPosition,
              furnitureId
            )}
          >
            {/* 물체 클릭 시 바닥 면 가능 불가능 색상 및 회전 각 prop 받기 */}
            <primitive
              object={clone}
              receiveShadow
              castShadow
              rotation-y={(rotation * Math.PI) / 2}
            />
            {isDragging && (
              <mesh position-y={0.02}>
                <boxGeometry
                  args={[(width * 0.48) / 2, 0, (height * 0.48) / 2]}
                />
                <meshBasicMaterial
                  color={canDrop ? "green" : "red"}
                  opacity={0.5}
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
              furnitureId
            )}
          >
            {/* 물체 클릭 시 바닥 면 가능 불가능 색상 및 회전 각 prop 받기 */}
            <primitive
              receiveShadow
              castShadow
              object={clone}
              rotation-y={(rotation * Math.PI) / 2}
            />
            {isDragging && (
              <mesh position-y={0.02}>
                <boxGeometry
                  args={[(width * 0.48) / 2, 0, (height * 0.48) / 2]}
                />
                <meshBasicMaterial
                  color={canDrop ? "green" : "red"}
                  opacity={0.5}
                  transparent
                />
              </mesh>
            )}
          </group>
        ))}
    </>
  )
}
