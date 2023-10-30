import { Canvas } from "@react-three/fiber";
import { Html, PerspectiveCamera } from "@react-three/drei";
import Experience from "../../components/Room/Experience";
import { fetchRoomData } from "../../api/User";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  draggedItemState,
} from "../../components/Room/Atom";
import { popUpStatusAtom } from "../../atom/RoomCustomTabAtom";

import Header from "../../components/Header/Header";
import MyFooter from "../../components/Footer/MyFooter";
import Share from "../../components/Header/Share";
import OtherFooter from "../../components/Footer/OtherFooter";
import NeighborRequest from "../../components/Header/NeighborRequest";
import styles from "./RoomPage.module.css";
import PopUp from "../../components/Room/RoomCustomPopUp/PopUp";
import SharePage from "../../components/Modal/Sharing/SharePage";
import SharingModalList from "../../components/Modal/Sharing/SharingModalList";
import { userAtom } from "../../atom/UserAtom";
import { roomInfoAtom } from "@/atom/RoomInfoAtom";

function RoomPage() {
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const [items, setItems] = useRecoilState(ItemsState);
  const [isMyRoom, setIsMyRoom] = useState(false);
  const [drag, setDrag] = useRecoilState(draggedItemState);
  const popUpStatus = useRecoilValue(popUpStatusAtom);
  const canvasRef = useRef();
  const [shareModal, setShareModal] = useState(false);
  const userInfo = useRecoilValue(userAtom);
  const [nickName, setNickName] = useRecoilState(roomInfoAtom);

  useEffect(() => {
    const roomId = window.location.pathname.match(/\d+/g);
    const myRoomId = userInfo.roomId;
    setIsMyRoom(roomId == myRoomId);

    fetchRoomData(
      roomId,
      (response) => {
        setItems(response.data.data.roomFurnitureList);
        setNickName(response.data.data.nickname);
      },
      (error) => {
        console.error("Error at fetching RoomData...", error);
        ("");
      }
    );
  }, [isMyRoom]);

  const randomVisit = () => {
    console.log("랜덤방문 함수");
  };

  useEffect(() => {
    console.log(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  return (
    <div className={styles.container}>
      {isMyRoom ? (
        <Header checkMyRoom={"my"} />
      ) : (
        <Header checkMyRoom={"other"} />
      )}
      {isMyRoom ? <Share setShareModal={setShareModal} /> : <NeighborRequest />}
      {shareModal && (
        <>
          <div
            className={styles.back}
            onClick={() => {
              setShareModal(false);
            }}
          />
          <SharePage shareModal={shareModal} canvasRef={canvasRef} />
          <SharingModalList shareMode={"room"} />
        </>
      )}
      {/* <div
        className={styles.button}
        onClick={() => {
          setEditMode(!editMode)
          if (drag) {
            setDrag(null)
          }
        }}
      >
        {editMode && <span>편집모드</span>}
        {!editMode && <span>관광모드</span>}
      </div> */}

      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ fov: 45, zoom: 1.3 }}
        ref={canvasRef}
      >
        <color attach="background" args={["skyblue"]} />

        <Experience />
      </Canvas>
      {/* 랜덤 찾기 버튼 */}
      {isMyRoom ? (
        <></>
      ) : (
        <div className={styles.buttonContainer}>
          <div className={styles.randomButton} onClick={randomVisit}>
            <img
              src={"/assets/icons/random.svg"}
              className={styles.randomImage}
            />
            <div className={styles.randomButtonContent}>랜덤 방문</div>
          </div>
        </div>
      )}
      {isMyRoom ? <MyFooter /> : <OtherFooter />}
      {/* {popUpStatus ? <PopUp/> : '' } */}
      <PopUp />
    </div>
  );
}

export default RoomPage;
