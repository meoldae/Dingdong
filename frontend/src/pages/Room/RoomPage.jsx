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
  lightColorState,
  roomColorState,
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
import { roomInfoAtom, roomAvatarAtom, roomHeartAtom } from "@/atom/RoomInfoAtom";
import { useNavigate } from "react-router-dom";
import history from "../../components/UI/history"; 

function RoomPage() {
  // 브라우저 뒤로가기 버튼 처리
  const [locationKeys, setLocationKeys] = useState([]);
  const navigate = useNavigate();
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
        window.location.replace(`${urlPath}/`);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          window.location.replace(`${urlPath}/`);
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
        }
      }
    });
  }, [locationKeys, history]);

  // 마이룸 로직
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const [items, setItems] = useRecoilState(ItemsState);
  const [isMyRoom, setIsMyRoom] = useState(false);
  const [drag, setDrag] = useRecoilState(draggedItemState);
  const popUpStatus = useRecoilValue(popUpStatusAtom);
  const canvasRef = useRef();
  const [shareModal, setShareModal] = useState(false);
  const userInfo = useRecoilValue(userAtom);
  const [nickName, setNickName] = useRecoilState(roomInfoAtom);
  const [avatarId, setAvatarId] = useRecoilState(roomAvatarAtom);
  const [heartCount, setHeartCount] = useRecoilState(roomHeartAtom);
  const [roomDrag, setRoomDrag] = useState(false);
  const roomId = window.location.pathname.match(/\d+/g);
  const today = new Date();
  const [time, setTime] = useState();
  const [roomColor,setRoomColor] = useRecoilState(roomColorState);
  const [lightColor,setLightColor] = useRecoilState(lightColorState);
  
  useEffect(() => {
    const myRoomId = userInfo.roomId;
    setIsMyRoom(roomId == myRoomId);
    fetchRoomData(
      roomId,
      (response) => { 
        setItems(response.data.data.roomFurnitureList);
        setNickName(response.data.data.nickname);
        setRoomColor(response.data.data.wallColor);
        setLightColor(response.data.data.lightColor);
        setAvatarId(response.data.data.avatarId);
        setHeartCount(response.data.data.heartCount);
      },
      (error) => {
        console.error("Error at fetching RoomData...", error);
        if (error.response && error.response.status === 400) {
          navigate(`${urlPath}/notfound`);
        }
      }
    );
  }, [isMyRoom, navigate]);

  useEffect(() => {
    const checkTime = today.getHours();

    if (checkTime >= 22 || checkTime < 6) {
      setTime("dawn");
    } else if (checkTime >= 6 && checkTime < 10) {
      // 06시부터 10시까지 morning
      setTime("morning");
    } else if (checkTime >= 10 && checkTime < 18) {
      // 10시부터 18시까지 afternoon
      setTime("afternoon");
    } else {
      // 18시부터 22시까지 dinner
      setTime("dinner");
    }
  }, []);
  return (
    <>
      {roomDrag && <div className={styles.roomDrag} />}
      {time && (
        <div className={`${styles.container}`}>
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
          <div className={`${styles.newcanvas} ${styles[time]}`} id="newcanvas">
            <Canvas
              className={styles.canvasCont}
              shadows
              dpr={[1, 2]}
              gl={{ preserveDrawingBuffer: true, antialias: true, pixelRatio: Math.min(2, window.devicePixelRatio) }}
              camera={{ fov: 45, zoom: 1.1 }}
              ref={canvasRef}
              flat={true}
            >
              <Experience setRoomDrag={setRoomDrag} />
            </Canvas>
          </div>
          {isMyRoom ? <MyFooter props={roomId[0]}/> : <OtherFooter props={roomId[0]} />}
          {/* {popUpStatus ? <PopUp/> : '' } */}
          <PopUp />
        </div>
      )}
    </>
  );
}

export default RoomPage;