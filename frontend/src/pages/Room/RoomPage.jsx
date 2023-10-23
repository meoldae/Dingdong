import { Canvas } from "@react-three/fiber";
import Experience from "../../components/Room/Experience";
import "./RoomPage.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ItemRotateState,
  buildModeState,
  draggedItemState,
} from "../../components/Room/Atom";
function RoomPage() {
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const isDrag = useRecoilValue(draggedItemState);
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState);

  return (
    <>
      <div
        id="button"
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode && <span>편집모드</span>}
        {!editMode && <span>관광모드</span>}
      </div>
      <div id="roationbtn">
        {editMode && isDrag !== null && (
          <span
            onClick={() => {
              setDraggedItemRotation(
                draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
              );
            }}
          >
            돌려돌려~
          </span>
        )}
      </div>
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 60 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default RoomPage;
