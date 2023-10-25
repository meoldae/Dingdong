import { Canvas } from "@react-three/fiber";
import Experience from "../../components/Room/Experience";
import "./RoomPage.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  draggedItemState,
} from "../../components/Room/Atom";
import Header from "../../components/Header/Header";
import MyFooter from "../../components/Footer/MyFooter";
import Share from "../../components/Header/Share";
import OtherFooter from "../../components/Footer/OtherFooter";
import NeighborRequset from "../../components/Header/neighborRequest";

function RoomPage() {
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const isDrag = useRecoilValue(draggedItemState);
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState);
  const item = useRecoilValue(ItemsState);
  return (
    <div className="container">
      <Header />
      <Share />
      {/* <NeighborRequset/> */}
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
              if (item[isDrag].wall) {
                // console.log("check");
                setDraggedItemRotation( draggedItemRotation=== 0 ? 1 : draggedItemRotation -1);
              } else {
                // console.log("CC")
                setDraggedItemRotation(
                  draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
                );
              }
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
      {/* <OtherFooter/> */}
      <MyFooter />
    </div>
  );
}

export default RoomPage;
