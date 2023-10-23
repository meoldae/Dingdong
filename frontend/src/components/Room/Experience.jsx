import { Environment, Grid, OrbitControls, useCursor } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Item } from "./Item";
import { Room } from "./Room";
import { useGrid } from "./UseGrid";
import { useRecoilState } from "recoil";
import {
  ItemsState,
  buildModeState,
  dragPositionState,
  draggedItemState,
} from "./Atom";
import { gsap } from "gsap";
const Experience = () => {
  const [onFloor, setOnFloor] = useState(false);
  const [buildMode, setBuildMode] = useRecoilState(buildModeState);
  const [draggedItem, setDraggedItem] = useRecoilState(draggedItemState);
  const [dragPosition, setDraggPosition] = useRecoilState(dragPositionState);
  const { vector3ToGrid, gridToVector3 } = useGrid();
  const [canDrop, setCanDrop] = useState(false);

  const item = {
    sofa: {
      name: "sofa",
      size: [1.44, 1.44],
    },
    carpet: {
      name: "carpet",
      size: [2.4, 2.4],
    },
    vase: {
      name: "vase",
      size: [0.48, 0.48],
    },
    bed: {
      name: "bed",
      size: [1.92, 2.4],
    },
  };

  const map = {
    size: [4.8, 4.8],
    // gridDivision:2,
    item: [
      {
        ...item.sofa,
        gridPosition: [item.sofa.size[0], item.sofa.size[1]],
        rotation: 1,
      },
      {
        ...item.bed,
        gridPosition: [item.bed.size[0], item.bed.size[1]],
        rotation: 2,
      },
      {
        ...item.vase,
        gridPosition: [item.vase.size[0], item.vase.size[1]],
        rotation: 1,
      },
      {
        ...item.carpet,
        gridPosition: [item.carpet.size[0], item.carpet.size[1]],
        rotation: 1,
        walkable: true,
        wall: true,
      },
    ],
  };

  const [items, setItems] = useRecoilState(ItemsState);

  const onPlaneClicked = (e) => {
    if (!buildMode) {
      return;
    }
    if (draggedItem !== null) {
      if (canDrop) {
        setItems((prev) => {
          const newItems = prev.map((item, index) => {
            // 드래그 중인 항목만 업데이트
            if (index === draggedItem) {
              // 새 오브젝트를 생성하고 gridPosition을 업데이트
              return {
                ...item,
                gridPosition: vector3ToGrid(e.point),
              };
            }
            // 다른 항목은 그대로 반환
            return item;
          });
          return newItems;
        });
      }
      setDraggedItem(null);
    }
  };
  useEffect(() => {
    if (draggedItem === null) {
      return;
    }
    const item = items[draggedItem];
    const width =
      item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
    const height =
      item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
    let droppable = true;

    // 이 부분은 내 asset 크기가 밖으로 나갈 때, 놓는걸 허락 안한다는 코드
    if (
      dragPosition[0] - width / 0.24 / 2 < 0 ||
      dragPosition[0] + width / 0.24 / 2 > map.size[0] / 0.24
    ) {
      droppable = false;
    }

    if (
      dragPosition[1] - height / 0.24 / 2 < 0 ||
      dragPosition[1] + height / 0.24 / 2 > map.size[1] / 0.24
    ) {
      droppable = false;
    }
    if (!item.walkable && !item.wall) {
      items.forEach((otherItem, idx) => {
        // ignore self
        if (idx === draggedItem) {
          return;
        }

        // ignore wall & floor
        if (otherItem.walkable || otherItem.wall) {
          return;
        }
        // check item overlap
        const otherWidth =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[1] / 0.24
            : otherItem.size[0] / 0.24;
        const otherHeight =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[0] / 0.24
            : otherItem.size[1] / 0.24;

        if (
          dragPosition[0] + width / 0.24 / 2 >
            otherItem.gridPosition[0] - otherWidth / 2 &&
          dragPosition[0] - width / 0.24 / 2 <
            otherItem.gridPosition[0] + otherWidth / 2 &&
          dragPosition[1] - height / 0.24 / 2 <
            otherItem.gridPosition[1] + otherHeight / 2 &&
          dragPosition[1] + height / 0.24 / 2 >
            otherItem.gridPosition[1] - otherWidth / 2
        ) {
          droppable = false;
        }
      });
    }

    setCanDrop(droppable);
  }, [dragPosition, draggedItem, items]);

  const controls = useRef();
  const state = useThree((state) => state);

  useEffect(() => {
    if (buildMode) {
      state.camera.position.set(8, 8, 8);
      state.camera.fov = 60;
      state.camera.lookAt(0, 0, 0);
      if (controls.current) {
        controls.current.target.set(0, 0, 0);
        controls.current.update();
      }
    }
  }, [buildMode]);

  const animateCameraPosition = () => {
    // Ensure we don't animate if we're in build mode.
    if (buildMode) return;

    // Animate camera position to [8, 8, 8] using gsap.to method
    gsap.to(state.camera.position, {
      duration: 0.5, // Duration in seconds
      x: 8,
      y: 8,
      z: 8,
      // Ensures Three.js scene updates with camera movement
      onUpdate: () => state.camera.updateProjectionMatrix(),
    });
    setTimeout(() => {
      state.camera.position.set(8, 8, 8);
    }, 50);
  };
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls
        ref={controls}
        minDistance={5}
        maxDistance={10}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        screenSpacePanning={false}
        enabled={!buildMode}
        onEnd={animateCameraPosition}
      />

      {buildMode
        ? items.map((item, idx) => (
            <Item
              key={`${item.name}-${idx}`}
              item={item}
              onClick={() => {
                setDraggedItem((prev) => {
                  return prev === null ? idx : prev; // 조건에 따라 적절한 값을 반환
                });
              }}
              isDragging={draggedItem === idx}
              dragPosition={dragPosition}
              canDrop={canDrop}
            />
          ))
        : items.map((item, idx) => (
            <Item key={`${item.name}-${idx}`} item={item} />
          ))}
      {/* <Room name={"room"}/> */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={onPlaneClicked}
        onPointerMove={(e) => {
          if (!buildMode) {
            return;
          }
          const newPosition = vector3ToGrid(e.point);
          if (
            !dragPosition ||
            newPosition[0] !== dragPosition[0] ||
            newPosition[1] !== dragPosition[1]
          ) {
            setDraggPosition(newPosition);
          }
        }}
        // rotation-z={-Math.PI / 4}
        // position-z={Math.sqrt(2) / 10}
      >
        <planeGeometry args={[4.8, 4.8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {buildMode && (
        <Grid
          infiniteGrid
          fadeStrength={6}
          sectionSize={2.4}
          cellSize={0.24}
          // rotation-y={Math.PI / 4}
          // position-z={Math.sqrt(2) / 10}
        />
      )}
    </>
  );
};

export default Experience;
