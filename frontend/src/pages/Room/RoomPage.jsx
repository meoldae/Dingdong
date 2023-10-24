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
import Header from "../../components/Header/Header";
import { Html } from "@react-three/drei";
import Footer from "../../components/Footer/Footer";

function RoomPage() {
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const isDrag = useRecoilValue(draggedItemState);
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState);

  return (
    <div className="container">
    <Header/>
      <div
        className="button"
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode && <span>편집모드</span>}
        {!editMode && <span>관광모드</span>}
      </div>
      <div className="roationbtn">
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
      <Canvas shadows camera={{ position: [8, 5, 8], fov: 90 }}>
        <color attach="background" args={["skyblue"]} />
        <Experience />
      </Canvas>
      <Footer/>
    </div>
  );
}

export default RoomPage;
