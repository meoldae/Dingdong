import { Canvas } from "@react-three/fiber";
import Experience from "../../components/Room/Experience";
import { fetchRoomData } from "../../api/User";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ItemsState } from "../../components/Room/Atom";

import styles from "./RoomPage.module.css";
import PopUp from "../../components/Room/RoomCustomPopUp/PopUp";
import { userAtom } from "../../atom/UserAtom";
import { roomInfoAtom } from "@/atom/RoomInfoAtom";

function InviteRoomPage() {
  const [items, setItems] = useRecoilState(ItemsState);
  const [isMyRoom, setIsMyRoom] = useState(false);
  const canvasRef = useRef();
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

  return (
    <div className={styles.container}>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ fov: 45, zoom: 1.2 }}
        ref={canvasRef}
      >
        <color attach="background" args={["skyblue"]} />

        <Experience />
      </Canvas> 
      <PopUp />
    </div>
  );
}

export default InviteRoomPage;