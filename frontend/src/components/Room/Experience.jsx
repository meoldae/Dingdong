import { Environment, Grid, OrbitControls, useCursor } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Item } from "./Item";
import { Room } from "./Room";
import { useGrid } from "./UseGrid";
const Experience = () => {
  const [onFloor, setOnFloor] = useState(false);
  const [buildMode, setBuildMode] = useState(true);
  const [draggedItem, setDraggedItem] = useState(undefined);
  const [dragPosition, setDraggPosition] = useState(null);
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
      size: [1.92, 2.88],
    },
  };

  const map = {
    size: [4.8, 4.8],
    // gridDivision:2,
    item: [
      {
        ...item.sofa,
        gridPosition: [item.sofa.size[0] , item.sofa.size[1] ],
        rotation: 1,
      },
      {
        ...item.bed,
        gridPosition: [item.bed.size[0] , item.bed.size[1] ],
        rotation: 2,
      },
      {
        ...item.vase,
        gridPosition: [item.vase.size[0] , item.vase.size[1] ],
        rotation: 1,
      },
      {
        ...item.carpet,
        gridPosition: [item.carpet.size[0] , item.carpet.size[1] ],
        rotation: 1,
      },
    ],
  };

  const [items, setItems] = useState(map.item);
  const onPlaneClicked = (e) => {
    if (!buildMode) {
      return;
    }
    if (draggedItem !== undefined) {
      // console.log(e)
      if (canDrop) {
      setItems((prev) => {
        const newItems = [...prev];
        newItems[draggedItem].gridPosition = vector3ToGrid(e.point);
        return newItems;
      });
    }
      setDraggedItem(undefined);
    }
  };

  useEffect(() => {
    if (!draggedItem) {
      return;
    }
    const item = items[draggedItem];
    console.log(item)
    const width =
      item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
    const height =
      item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
    let droppable = true;

    // 이 부분은 내 asset 크기가 밖으로 나갈 때, 놓는걸 허락 안한다는 코드
    if (
      dragPosition[0] -width/0.24/2< 0 ||
      dragPosition[0] + width/0.24/2 > map.size[0] /0.24
    ) {

      droppable = false;
    }

    if (
      dragPosition[1] - height/0.24/2 < 0 ||
      dragPosition[1] + height/0.24/2 > map.size[1]  /0.24
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
            ? otherItem.size[1] /0.24 
            : otherItem.size[0] /0.24;
        const otherHeight =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[0] /0.24
            : otherItem.size[1] /0.24;



        if (
          dragPosition[0] + width /0.24 /2> otherItem.gridPosition[0] -otherWidth/2 &&
          dragPosition[0] - width /0.24 /2 < otherItem.gridPosition[0] +otherWidth /2&&
          dragPosition[1] - height/0.24 /2< otherItem.gridPosition[1] + otherHeight /2&&
          dragPosition[1] + height /0.24 /2> otherItem.gridPosition[1] - otherWidth /2
        ) {
          droppable = false;
        }
      });
    }

    setCanDrop(droppable);
  }, [dragPosition, draggedItem, items]);
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      {(buildMode ? items : map.item).map((item, idx) => (
        <Item
          key={`${item.name}-${idx}`}
          item={item}
          onClick={() => setDraggedItem((prev) => (prev === undefined ? idx : prev))}
          isDragging={draggedItem === idx}
          dragPosition={dragPosition}
          canDrop = {canDrop}
        />
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
      <Grid
        infiniteGrid
        fadeStrength={6}
        sectionSize={2.4}
        cellSize={0.24}
        // rotation-y={Math.PI / 4}
        // position-z={Math.sqrt(2) / 10}
      />
    </>
  );
};

export default Experience;
