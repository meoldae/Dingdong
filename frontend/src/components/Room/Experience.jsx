import {
  Environment,
  Cloud,
  Clouds,
  Grid,
  OrbitControls,
  Sky,
  SoftShadows,
  SpotLight,
  Stars,
  Sparkles,
  Lightformer,
} from "@react-three/drei"
import { useEffect, useState, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Item } from "./Item"
import { Room } from "./Room"
import { useGrid } from "./UseGrid"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  canDropState,
  checkState,
  dragPositionState,
  draggedItemState,
  lightColorState,
  mobileCheckState,
  roomColorState,
} from "./Atom"
import { gsap } from "gsap"
import { DoubleSide, PlaneGeometry } from "three"
const Experience = ({ setRoomDrag }) => {
  const buildMode = useRecoilValue(buildModeState)
  const [draggedItem, setDraggedItem] = useRecoilState(draggedItemState)
  const [dragPosition, setDraggPosition] = useRecoilState(dragPositionState)
  const { vector3ToGrid, wallLeftVector3ToGrid, wallRightVector3ToGrid } =
    useGrid()
  const [canDrop, setCanDrop] = useRecoilState(canDropState)
  const [items, setItems] = useRecoilState(ItemsState)
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState)
  const check = useRecoilValue(checkState)
  const mobileCheck =
    /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  const [roomColor, setRoomColor] = useRecoilState(roomColorState)
  const [lightColor, setLightColor] = useRecoilState(lightColorState)
  // setColor("#D8BFD8")
  // FFDAB9
  // AFEEEE
  //D8BFD8
  // onPlaneClicked 이벤트에 예외처리
  useEffect(() => {
    if (draggedItem === null) {
      return
    }
    const item = items[draggedItem]
    let droppable = true
    const thick = item.size[1]
    // 바닥 평면 넘어갔을 때 예외처리
    const width =
      draggedItemRotation === 1 || draggedItemRotation === 3
        ? item.size[2]
        : item.size[0]
    const height =
      draggedItemRotation === 1 || draggedItemRotation === 3
        ? item.size[0]
        : item.size[2]
    if (item.categoryId !== 3) {
      if (
        dragPosition[0] - width / 2 < 0 ||
        dragPosition[0] + width / 2 > 4.8 / 0.24
      ) {
        droppable = false
      }
      if (
        dragPosition[2] - height / 2 < 0 ||
        dragPosition[2] + height / 2 > 4.8 / 0.24
      ) {
        droppable = false
      }
    }
    // 벽면이 외부로 넘어갔을 때 예외처리
    if (item.categoryId === 3) {
      if (draggedItemRotation) {
        if (
          dragPosition[1] - thick / 2 < -1 ||
          dragPosition[1] + thick / 2 > 16
        ) {
          droppable = false
        }
        if (
          dragPosition[2] - height / 2 < 0 ||
          dragPosition[2] + height / 2 > 4.8 / 0.24
        ) {
          droppable = false
        }
      } else {
        if (
          dragPosition[1] - thick / 2 < -1 ||
          dragPosition[1] + thick / 2 > 16
        ) {
          droppable = false
        }
        if (
          dragPosition[0] - width / 2 < 0 ||
          dragPosition[0] + width / 2 > 4.8 / 0.24
        ) {
          droppable = false
        }
      }
    }

    // 다른 물체 예외 처리
    items.forEach((otherItem, idx) => {
      // 드래그 중인 물체면 예외 처리
      if (idx === draggedItem) {
        return
      }
      // 카펫처럼 쌓을 수 있고 다른 아이템이 벽면에 있는 것이 아닐 경우
      if (otherItem.categoryId === 2 && otherItem.categoryId !== 3) {
        return
      }
      // 다른 물체 크기
      const otherThick = otherItem.size[1]
      const otherWidth =
        otherItem.rotation === 1 || otherItem.rotation === 3
          ? otherItem.size[2]
          : otherItem.size[0]
      const otherHeight =
        otherItem.rotation === 1 || otherItem.rotation === 3
          ? otherItem.size[0]
          : otherItem.size[2]

      // 다른 물체가 왼쪽 벽에 있고, 바닥에 있는 걸 움직일 때
      if (
        otherItem.categoryId === 3 &&
        item.categoryId !== 3 &&
        otherItem.rotation
      ) {
        if (dragPosition[0] - width / 2 <= 0) {
          if (
            dragPosition[1] + thick > otherItem.position[1] - thick / 2 &&
            dragPosition[2] + height / 2 >
              otherItem.position[2] - otherHeight / 2 &&
            dragPosition[2] - height / 2 <
              otherItem.position[2] + otherHeight / 2
          )
            droppable = false
        }
      }
      // 다른 물체가 오른쪽 벽에 있고, 바닥에 있는 걸 움직일 때
      if (
        otherItem.categoryId === 3 &&
        item.categoryId !== 3 &&
        !otherItem.rotation
      ) {
        if (dragPosition[2] - height / 2 <= 0) {
          if (
            dragPosition[1] + thick > otherItem.position[1] - thick / 2 &&
            dragPosition[0] + width / 2 >
              otherItem.position[0] - otherWidth / 2 &&
            dragPosition[0] - width / 2 < otherItem.position[0] + otherWidth / 2
          )
            droppable = false
        }
      }
      // 바닥 평면에 있는 다른 물체가 있을 때,
      if (
        item.categoryId !== 2 &&
        item.categoryId !== 3 &&
        otherItem.categoryId !== 3
      ) {
        if (
          dragPosition[0] + width / 2 >
            otherItem.position[0] - otherWidth / 2 &&
          dragPosition[0] - width / 2 <
            otherItem.position[0] + otherWidth / 2 &&
          dragPosition[2] - height / 2 <
            otherItem.position[2] + otherHeight / 2 &&
          dragPosition[2] + height / 2 > otherItem.position[2] - otherHeight / 2
        ) {
          droppable = false
        }
      }

      // 왼쪽 벽면에 있는 게 움직일 때, 평면 물체와 비교
      if (item.categoryId === 3 && item.rotation) {
        if (otherItem.position[0] - otherWidth / 2 <= 0) {
          if (
            dragPosition[1] - thick / 2 <
              otherItem.position[1] + otherThick / 2 &&
            dragPosition[1] + thick / 2 >
              otherItem.position[1] - otherThick / 2 &&
            dragPosition[2] + height / 2 >
              otherItem.position[2] - otherHeight / 2 &&
            dragPosition[2] - height / 2 <
              otherItem.position[2] + otherHeight / 2
          ) {
            droppable = false
          }
        }
      }
      // 오른쪽 벽면에 있는 게 움직일 때, 평면 물체와 비교
      if (item.categoryId === 3 && !item.rotation) {
        if (otherItem.position[2] - otherHeight / 2 <= 0) {
          if (
            dragPosition[1] - thick / 2 <
              otherItem.position[1] + otherThick / 2 &&
            dragPosition[1] + thick / 2 >
              otherItem.position[1] - otherThick / 2 &&
            dragPosition[0] + width / 2 >
              otherItem.position[0] - otherWidth / 2 &&
            dragPosition[0] - width / 2 < otherItem.position[0] + otherWidth / 2
          ) {
            droppable = false
          }
        }
      }
      // 벽면에 있는 물체끼리 비교
      if (
        item.categoryId === 3 &&
        item.rotation &&
        otherItem.categoryId === 3
      ) {
        if (
          otherItem.position[0] - otherWidth / 2 === 0 &&
          dragPosition[2] + height / 2 >
            otherItem.position[2] - otherHeight / 2 &&
          dragPosition[2] - height / 2 <
            otherItem.position[2] + otherHeight / 2 &&
          dragPosition[1] + thick / 2 >
            otherItem.position[1] - otherThick / 2 &&
          dragPosition[1] - thick / 2 < otherItem.position[1] + otherThick / 2
        ) {
          droppable = false
        }
      }
      if (
        item.categoryId === 3 &&
        !item.rotation &&
        otherItem.categoryId === 3
      ) {
        if (
          otherItem.position[2] - otherHeight / 2 === 0 &&
          dragPosition[0] + width / 2 >
            otherItem.position[0] - otherWidth / 2 &&
          dragPosition[0] - width / 2 <
            otherItem.position[0] + otherWidth / 2 &&
          dragPosition[1] + thick / 2 >
            otherItem.position[1] - otherThick / 2 &&
          dragPosition[1] - thick / 2 < otherItem.position[1] + otherThick / 2
        ) {
          droppable = false
        }
      }
    })
    setCanDrop(droppable)
  }, [dragPosition, draggedItem, items, draggedItemRotation])
  // 아이템 클릭 로직
  const renderItem = (item, idx) => {
    const commonProps = {
      key: `${item.furnitureId}-${idx}`,
      item: item,
      categoryId: item.categoryId,
    }

    if (buildMode) {
      return (
        <Item
          {...commonProps}
          onClick={() => {
            setDraggedItem((prev) => (prev === null ? idx : prev))
            if (draggedItemRotation === null) {
              setDraggedItemRotation(items[idx].rotation)
            }
          }}
          isDragging={draggedItem === idx}
          dragPosition={dragPosition}
          draggedItemRotation={draggedItemRotation}
          canDrop={canDrop}
        />
      )
    }

    return <Item {...commonProps} />
  }

  // 카메라 관련 로직
  const controls = useRef()
  const state = useThree((state) => state)
  // 편집 모드일 때 카메라 고정
  useEffect(() => {
    if (buildMode) {
      state.camera.position.set(15, 10, 15)
      if (controls.current) {
        controls.current.target.set(0, 0, 0)
        controls.current.update()
      }
    } else {
      state.camera.position.set(15, 10, 15)
    }
  }, [buildMode])
  // 일반 모드일 때 카메라 회전 후 원상복귀
  const animateCameraPosition = () => {
    if (buildMode) return
    setRoomDrag(true)
    gsap.to(state.camera.position, {
      duration: 0.5,
      x: 15,
      y: 10,
      z: 15,
      onUpdate: () => state.camera.updateProjectionMatrix(),
    })
    gsap.to(state.camera, {
      fov: 45,
      duration: 0.5,
      onUpdate: () => state.camera.updateProjectionMatrix(),
    })
    setTimeout(() => {
      setRoomDrag(false)
    }, 600)
  }
  useFrame((state) => {
    state.camera.lookAt(0, 1, 0)
  })

  // useEffect(()=>{

  // },[lightColor,roomColor])
  return (
    <>
      {/* <Environment preset="s nset" /> */}
      {/* 별 */}
      <Stars
        radius={100}
        depth={50}
        count={20000}
        factor={5}
        saturation={2}
        fade
        speed={1.5}
      />
      {/* 조명들 */}
      <pointLight
        color={lightColor}
        intensity={20}
        // distance={8}
        // receiveShadow
        position={[3, 4, 1]}
      />
      <hemisphereLight
        intensity={1}
        color="skyblue"
        groundColor="white"
        position={[0, 5, 0]}
        // castShadow
      />
      <ambientLight intensity={0.1} />

      <directionalLight
        castShadow
        position={[1, 2, 1]}
        color={"white"}
        intensity={2}
        // distance={100}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        // ref={lightRef}
      />
      <directionalLight
        position={[3, 10, 3]}
        color={lightColor}
        intensity={0.5}
        // distance={100}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        // ref={lightRef}
      />
      <directionalLight
        position={[3, 10, 3]}
        // castShadow
        color={lightColor}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />
      {/* 컨트롤 */}
      <OrbitControls
        ref={controls}
        enableZoom={false}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        screenSpacePanning={false}
        enabled={!buildMode}
        // enableRotate={false}
        onEnd={animateCameraPosition}
      />
      {/* 아이템들 */}
      {items && items.map(renderItem)}
      {/* 바닥 평면 */}
      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        // visible={false}
        position-y={-0.251}
        onClick={() => {
          if (!mobileCheck) {
            if (
              draggedItem !== null &&
              dragPosition &&
              items[draggedItem]["categoryId"] !== 3
            ) {
              if (canDrop) {
                setItems((prev) => {
                  const newItems = prev.map((item, index) => {
                    if (index === draggedItem) {
                      return {
                        ...item,
                        position: dragPosition,
                        rotation: draggedItemRotation,
                      }
                    }
                    return item
                  })
                  return newItems
                })
                setDraggedItemRotation(null)
                setDraggedItem(null)
              } else {
                if (
                  check.length !== items.length &&
                  draggedItem === items.length - 1
                ) {
                  setItems((prevItems) => {
                    return prevItems.filter((_, index) => index !== draggedItem)
                  })
                  setDraggedItemRotation(null)
                  setDraggedItem(null)
                }
              }
            }
          }
        }}
        onPointerMove={(e) => {
          if (!buildMode) {
            return
          }
          const newPosition = vector3ToGrid(e.point)
          if (
            !dragPosition ||
            newPosition[0] !== dragPosition[0] ||
            newPosition[2] !== dragPosition[2]
          ) {
            setDraggPosition(newPosition)
          }
        }}
      >
        <boxGeometry args={[4.8, 4.8, 0.4]} />
        <meshStandardMaterial color={roomColor} />
      </mesh>
      {/* 왼쪽 평면 */}
      <mesh
        receiveShadow
        rotation-y={Math.PI / 2}
        position-x={-2.6}
        // visible={false}
        position-y={1.71}
        position-z={-0.2}
        onClick={() => {
          if (!mobileCheck) {
            if (
              draggedItem !== null &&
              dragPosition &&
              items[draggedItem].categoryId === 3
            ) {
              if (canDrop) {
                setItems((prev) => {
                  const newItems = prev.map((item, index) => {
                    if (index === draggedItem) {
                      return {
                        ...item,
                        position: dragPosition,
                        rotation: draggedItemRotation,
                      }
                    }
                    return item
                  })
                  return newItems
                })
                setDraggedItemRotation(null)
                setDraggedItem(null)
              } else {
                if (
                  check.length !== items.length &&
                  draggedItem === items.length - 1
                ) {
                  setItems((prevItems) => {
                    return prevItems.filter((_, index) => index !== draggedItem)
                  })
                  setDraggedItemRotation(null)
                  setDraggedItem(null)
                }
              }
            }
          }
        }}
        onPointerMove={(e) => {
          if (!buildMode) {
            return
          }
          const newPosition = wallLeftVector3ToGrid(e.point)
          if (
            !dragPosition ||
            newPosition[1] !== dragPosition[1] ||
            newPosition[2] !== dragPosition[2]
          ) {
            setDraggPosition(newPosition)
          }
        }}
      >
        <boxGeometry args={[5.2, 4.32, 0.4]} />
        <meshStandardMaterial color={roomColor} side={DoubleSide} />
      </mesh>
      {/* 오른쪽 평면 */}
      <mesh
        receiveShadow
        position-z={-2.6}
        // visible={false}
        position-y={1.71}
        onClick={() => {
          if (!mobileCheck) {
            if (
              draggedItem !== null &&
              dragPosition &&
              items[draggedItem].categoryId === 3
            ) {
              if (canDrop) {
                setItems((prev) => {
                  const newItems = prev.map((item, index) => {
                    if (index === draggedItem) {
                      return {
                        ...item,
                        position: dragPosition,
                        rotation: draggedItemRotation,
                      }
                    }
                    return item
                  })
                  return newItems
                })
                setDraggedItemRotation(null)
                setDraggedItem(null)
              } else {
                if (
                  check.length !== items.length &&
                  draggedItem === items.length - 1
                ) {
                  setItems((prevItems) => {
                    return prevItems.filter((_, index) => index !== draggedItem)
                  })
                  setDraggedItemRotation(null)
                  setDraggedItem(null)
                }
              }
            }
          }
        }}
        onPointerMove={(e) => {
          if (!buildMode) {
            return
          }
          const newPosition = wallRightVector3ToGrid(e.point)
          if (
            !dragPosition ||
            newPosition[0] !== dragPosition[0] ||
            newPosition[1] !== dragPosition[1]
          ) {
            setDraggPosition(newPosition)
          }
        }}
      >
        <boxGeometry args={[4.8, 4.32, 0.4]} />
        <meshStandardMaterial color={roomColor} side={DoubleSide} />
      </mesh>
      {buildMode && (
        <>
          {/* <Grid
            args={[4.8, 4.8]}
            position-y={-0.05}
            fadeStrength={6}
            sectionSize={2.4}
            cellSize={0.24}
          />
          <Grid
            args={[4.8, 3.84]}
            fadeStrength={6}
            sectionSize={2.4}
            cellSize={0.24}
            position-z={-2.399}
            position-y={1.92}
            rotation-x={Math.PI / 2}
          />
          <Grid
            args={[3.84, 4.8]}
            fadeStrength={6}
            sectionSize={2.4}
            cellSize={0.24}
            position-y={1.92}
            position-x={-2.399}
            rotation-z={-Math.PI / 2}
          /> */}
        </>
      )}
    </>
  )
}

export default Experience
