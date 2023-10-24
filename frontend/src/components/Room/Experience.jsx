import { Environment, Grid, OrbitControls, useCursor } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Item } from "./Item";
import { Room } from "./Room";
import { useGrid } from "./UseGrid";
import { useRecoilState } from "recoil";
import {
  ItemRotateState,
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



  const [items, setItems] = useRecoilState(ItemsState);
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState);

  const onPlaneClicked = (e) => {
    if (!buildMode) {
      return;
    }
    if (draggedItem !== null) {
      if (canDrop) {
        setItems((prev) => {
          const newItems = prev.map((item, index) => {
            if (index === draggedItem) {
              return {
                ...item,
                gridPosition: vector3ToGrid(e.point),
                rotation: draggedItemRotation,
              };
            }
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
      item.rotation === 1 || item.rotation === 3 ? item.size[2] : item.size[0];
    const height =
      item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[2];
    let droppable = true;
    if (
      dragPosition[0] - width/2  < 0 ||
      dragPosition[0] + width /2 > 4.8 / 0.24
    ) {
      droppable = false;

    }

    if (
      dragPosition[2] - height/2  < 0 ||
      dragPosition[2] + height  /2> 4.8 / 0.24
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
            ? otherItem.size[2] 
            : otherItem.size[0] ;
        const otherHeight =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[0] 
            : otherItem.size[2] ;
        if (
          dragPosition[0] + width /2 >
            otherItem.gridPosition[0] - otherWidth /2 &&
          dragPosition[0] - width /2 <
            otherItem.gridPosition[0] + otherWidth /2 &&
          dragPosition[2] - height/2  <
            otherItem.gridPosition[2] + otherHeight/2  &&
          dragPosition[2] + height/2  >
            otherItem.gridPosition[2] - otherHeight /2
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
    if (buildMode) return;

    gsap.to(state.camera.position, {
      duration: 0.5,
      x: 8,
      y: 8,
      z: 8,
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
                setDraggedItem((prev) => (prev === null ? idx : prev));
                setDraggedItemRotation(item.rotation || 0);
              }}
              isDragging={draggedItem === idx}
              dragPosition={dragPosition}
              dragRotation={draggedItemRotation}
              canDrop={canDrop}
            />
          ))
        : items.map((item, idx) => (
            <Item key={`${item.name}-${idx}`} item={item} />
          ))}


      {/* 바닥 평면 */}
      <mesh
        rotation-x={-Math.PI / 2}
        // visible={false}
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
            newPosition[2] !== dragPosition[2]
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

      {/* 왼쪽 평면 */}
      <mesh 
      rotation-y={Math.PI / 2} 
      position-x={-2.394} 
      position-y={1.92}
      onPointerMove={(e)=>{
      }}>
        <planeGeometry args={[4.8, 3.84]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* 오른쪽 평면 */}
      <mesh 
      position-z={-2.394} 
      position-y={1.92}
      >
        <planeGeometry args={[4.8, 3.84]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {buildMode && (
        <>
          <Grid
            infiniteGrid
            fadeStrength={6}
            sectionSize={2.4}
            cellSize={0.24}
            // rotation-y={Math.PI / 4}
            // position-z={Math.sqrt(2) / 10}
          />
          <Grid
            infiniteGrid
            fadeStrength={6}
            sectionSize={2.4}
            cellSize={0.24}
            position-z={-2.393}
            rotation-x={Math.PI / 2}
          />
          <Grid
            infiniteGrid
            fadeStrength={6}
            sectionSize={2.4}
            cellSize={0.24}
            position-x={-2.393}
            rotation-z={-Math.PI / 2}
          />
        </>
      )}
    </>
  );
};

export default Experience;
