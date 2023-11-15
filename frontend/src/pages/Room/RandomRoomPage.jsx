// Three.js
import { Canvas } from "@react-three/fiber";
import Experience from "../../components/Room/Experience";

// API
import { fetchRoomData } from "../../api/User";

// 라이브러리
import { Suspense, useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// ATOM
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  draggedItemState,
  lightColorState,
  roomColorState,
} from "../../components/Room/Atom";
import { popUpStatusAtom } from "../../atom/RoomCustomTabAtom";

// 컴포넌트
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
import RandomBtn from "../../components/Button/Room/RandomBtn";
import { getRandomRoom } from "@/api/Room";

function RandomRoomPage() {
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
  const [roomColor, setRoomColor] = useRecoilState(roomColorState);
  const [lightColor, setLightColor] = useRecoilState(lightColorState);
  useEffect(() => {
    const myRoomId = userInfo.roomId;
    setIsMyRoom(roomId == myRoomId);

    fetchRoomData(
      roomId,
      (response) => {
        setItems(response.data.data.roomFurnitureList);
        setNickName(response.data.data.nickname);
        setAvatarId(response.data.data.avatarId);
        setHeartCount(response.data.data.heartCount);
        setRoomColor(response.data.data.wallColor);
        setLightColor(response.data.data.lightColor);
      },
      (error) => {
        console.error("Error at fetching RoomData...", error);
        if (error.response && error.response.status === 400) {
          navigate(`${urlPath}/notfound`);
        }
      }
    );
  }, [isMyRoom, navigate]);

  const randomVisit = () => {
    const roomId = window.location.pathname.match(/\d+/g)
      ? Number(window.location.pathname.match(/\d+/g)[0])
      : null; 
    let randRoomId;

    getRandomRoom(
      (response) => {
        randRoomId = response.data.data;

        window.location.replace(`${urlPath}/random/${randRoomId}`);
        // navigate(`${urlPath}/random/${randRoomId}`)
      },
      (error) => {
        console.log("Error with Random Room...", error);
      }
    );
  };

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
          <div className={`${styles.newcanvas} ${styles[time]}`}>
            <Canvas
              shadows
              gl={{ preserveDrawingBuffer: true, antialias: true }}
              camera={{ fov: 45, zoom: 1.1 }}
              ref={canvasRef}
            >
              <Experience setRoomDrag={setRoomDrag} />
            </Canvas>
          </div>
          {/* 랜덤 찾기 버튼 */}
          {isMyRoom ? (
            <></>
          ) : (
            <div className={styles.buttonContainer}>
              <div className={styles.randomButton}>
                <RandomBtn onClick={randomVisit} />
              </div>
            </div>
          )}
          {isMyRoom ? <MyFooter /> : <OtherFooter props={roomId[0]} />}
          <PopUp />
        </div>
      )}
    </>
  );
}

export default RandomRoomPage;
