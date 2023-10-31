import { Canvas } from "@react-three/fiber";
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
import { useNavigate } from "react-router-dom";

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
  const roomId = window.location.pathname.match(/\d+/g);
  const navigate = useNavigate();
  const today = new Date();
  const [time, setTime] = useState();
  useEffect(() => {
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
      }
    );
  }, [isMyRoom]);

  const randomVisit = () => {
    const roomId = window.location.pathname.match(/\d+/g)
      ? Number(window.location.pathname.match(/\d+/g)[0])
      : null;
    const myRoomId = userInfo.roomId;
    let randomRoom;

    do {
      randomRoom = Math.floor(Math.random() * 6) + 1;
    } while (randomRoom === roomId || randomRoom === myRoomId);
    window.location.replace(`/room/${randomRoom}`);
  };

  useEffect(() => {
    const checkTime = today.getHours();
    if (checkTime >= 0 && checkTime < 6) {
        setTime("dawn");
    } else if (checkTime >= 6 && checkTime < 12) {
        setTime("morning");
    } else if (checkTime >= 12 && checkTime < 18) {
        setTime("afternoon");
    } else {
        setTime("dinner");
    }
  }, []);
  return (
    <>
    {time &&

      <div className={`${styles.container} ${styles[time]}`}>
        {isMyRoom ? (
          <Header checkMyRoom={"my"} />
        ) : (
          <Header checkMyRoom={"other"} />
        )}
        {isMyRoom ? (
          <Share setShareModal={setShareModal} />
        ) : (
          <NeighborRequest />
        )}
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

        <Canvas
          shadows
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          camera={{ fov: 45, zoom: 1.2 }}
          ref={canvasRef}
        >
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
        {isMyRoom ? <MyFooter /> : <OtherFooter props={roomId[0]} />}
        {/* {popUpStatus ? <PopUp/> : '' } */}
        <PopUp />
      </div>
  }
    </>
  );
}

export default RoomPage;
