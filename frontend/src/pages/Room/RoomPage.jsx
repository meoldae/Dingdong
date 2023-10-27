import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Experience from "../../components/Room/Experience";
import { fetchRoomData } from "../../api/User";
import { Suspense, useState, useEffect } from "react";
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
import NeighborRequest from "../../components/Header/NeighborRequest";
import styles from "./RoomPage.module.css";
function RoomPage() {
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const [isMyRoom, setIsMyRoom] = useState(false);

  useEffect(() => {
    fetchRoomData().then((response) => {
      if (response.data.isMyRoom) {
        setIsMyRoom(true);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {isMyRoom ? <Share /> : <NeighborRequest />}

      <div
        className={styles.button}
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode && <span>편집모드</span>}
        {!editMode && <span>관광모드</span>}
      </div>

      <Canvas shadows camera={{ position: [8, 3, 8], fov: 70 }}>
        <color attach="background" args={["skyblue"]} />
        <Suspense
          fallback={
            <Html>
              <div>껄껄껄 로딩중이란다 하하하ㅏ</div>
            </Html>
          }
        >
          <Experience />
        </Suspense>
      </Canvas>
      {isMyRoom ? <MyFooter /> : <OtherFooter />}
    </div>
  );
}

export default RoomPage;
