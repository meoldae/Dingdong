// React
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// 스타일
import styles from "./SingleMainPage.module.css";

// API
import { reportLetter } from "../../api/Letter";

// Three.js 기본 세팅
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CustomCamera from "../../components/Default/CustomCamera";
import DirectionalLight from "../../components/Default/DirectionLight";
import Map from "../../components/Default/Map";

// Three.js
import Model from "../../components/Item/MainItems/Character";
import House from "../../components/Item/MainItems/tempItems/House";
import Spot from "../../components/Item/MainItems/tempItems/Spot";

// 각 건물 포탈
import DefaultPortal from "../../components/Item/MainItems/Portals/DefaultPortal";
import DefaultPortalRing from "../../components/Item/MainItems/Portals/DefaultPortalRing";

// React 컴포넌트
import ConfirmEnteringDefaultModal from "../../components/Modal/Confirm/ConfirmEnteringDefaultModal";
import PhysicsModel from "../../components/Item/MainItems/PhysicsModel";
import RankingModal from "../../components/Modal/Ranking/RankingModal";
import PostofficeCardBox from "../Postoffice/PostofficeCardBox";
import PostofficeSendLetter from "../Postoffice/PostofficeSendLetter";
import GuidePage from "../../components/UI/GuidePage";
import SingleHeader from "./SingleHeader";
import RankingInformation from "../../components/Modal/Ranking/RankingInformation";
import PostOfficeModal from "../../components/Modal/PostOffice/PostOfficeModal";
import DefaultModal from "../../components/Modal/Default/DefaultModal";
import PostBox from "../../components/Modal/Post/PostBox";
import ReceiveLetter from "../../components/Modal/Post/ReceiveLetter";
import { successMsg } from "../../utils/customToast";

// Atom
import {
  CharacterPositionAtom,
  DefaultPosition,
  DefaultZoom,
} from "../../atom/DefaultSettingAtom";
import {
  postofficeCardAtom,
  postofficeSendLetterAtom,
  finishPostofficeCardAtom,
  finishPostofficeSendLetterAtom,
  isPostBoxVisibleAtom,
  isFinishPostBoxVisibleAtom,
  isReceiveLetterVisibleAtom,
  isFinishReceiveLetterVisibleAtom,
  reportPostVisibleAtom,
} from "../../atom/PostAtom";
import {
  isPostOfficeVisibleAtom,
  isFinishPostOfficeVisibleAtom,
} from "../../atom/PostOfficeAtom";
import {
  ArriveAtom,
  ConfirmEnteringInstaAtom,
  ConfirmEnteringOtherRoomAtom,
  ConfirmEnteringPostBoxAtom,
  ConfirmEnteringPostOfficeAtom,
  ConfirmEnteringRankAtom,
  ConfirmEnteringRoomAtom,
  ConfirmEnteringStoreAtom,
  ConfirmEnteringTestAtom,
  ConfirmEnteringTwitterAtom,
  ConfirmEnteringWorldAtom,
  InstaPortalPositionAtom,
  InstaPortalVisibleAtom,
  OtherRoomPortalPositionAtom,
  OtherRoomPortalVisibleAtom,
  PostBoxPortalPositionAtom,
  PostBoxPortalVisibleAtom,
  PostOfficePortalPositionAtom,
  PostOfficePortalVisibleAtom,
  RankPortalPositionAtom,
  RankPortalVisibleAtom,
  RoomPortalPositionAtom,
  StorePortalPositionAtom,
  StorePortalVisibleAtom,
  TestPortalPositionAtom,
  TestPortalVisibleAtom,
  TwitterPortalPositionAtom,
  TwitterPortalVisibleAtom,
  WorldPortalPositionAtom,
  WorldPortalVisibleAtom,
} from "../../atom/SinglePlayAtom";
import { RoomPortalVisibleAtom } from "../../atom/SinglePlayAtom";
import { letterIdAtom } from "../../atom/LetterAtom";

const SingleMainPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;
  // 카메라 설정
  const setDefaultCameraPosition = useSetRecoilState(DefaultPosition);
  const setDefaultCameraZoom = useSetRecoilState(DefaultZoom);

  // 도착 여부
  const setIsArrived = useSetRecoilState(ArriveAtom);
  const isArrived = useRecoilValue(ArriveAtom);
  // 장소 입장 확인 여부
  const [confirmEnteringRoom, setConfirmEnteringRoom] = useRecoilState(
    ConfirmEnteringRoomAtom
  );
  const [confirmEnteringPostOffice, setConfirmEnteringPostOffice] =
    useRecoilState(ConfirmEnteringPostOfficeAtom);
  const [confirmEnteringStore, setConfirmEnteringStore] = useRecoilState(
    ConfirmEnteringStoreAtom
  );
  const [confirmEnteringOtherRoom, setConfirmEnteringOtherRoom] =
    useRecoilState(ConfirmEnteringOtherRoomAtom);
  const [confirmEnteringWorld, setConfirmEnteringWorld] = useRecoilState(
    ConfirmEnteringWorldAtom
  );
  const [confirmEnteringRank, setConfirmEnteringRank] = useRecoilState(
    ConfirmEnteringRankAtom
  );

  const [confirmEnteringTest, setConfirmEnteringTest] = useRecoilState(
    ConfirmEnteringTestAtom
  );

  const [confirmEnteringInsta, setConfirmEnteringInsta] = useRecoilState(
    ConfirmEnteringInstaAtom
  );

  const [confirmEnteringTwitter, setConfirmEnteringTwitter] = useRecoilState(
    ConfirmEnteringTwitterAtom
  );

  const [confirmEnteringPostBox, setConfirmEnteringPostBox] = useRecoilState(
    ConfirmEnteringPostBoxAtom
  );

  // 포탈 생성 여부
  const [roomPortalVisible, setRoomPortalVisible] = useRecoilState(
    RoomPortalVisibleAtom
  );
  const [postOfficePortalVisible, setPostOfficePortalVisible] = useRecoilState(
    PostOfficePortalVisibleAtom
  );
  const [storePortalVisible, setStorePortalVisible] = useRecoilState(
    StorePortalVisibleAtom
  );
  const [otherRoomPortalVisible, setOtherRoomPortalVisible] = useRecoilState(
    OtherRoomPortalVisibleAtom
  );
  const [worldPortalVisible, setWorldPortalVisible] = useRecoilState(
    WorldPortalVisibleAtom
  );
  const [rankPortalVisible, setRankPortalVisible] = useRecoilState(
    RankPortalVisibleAtom
  );
  const [testPortalVisible, setTestPortalVisible] = useRecoilState(
    TestPortalVisibleAtom
  );
  const [instaPortalVisible, setInstaPortalVisible] = useRecoilState(
    InstaPortalVisibleAtom
  );
  const [twitterPortalVisible, setTwitterPortalVisible] = useRecoilState(
    TwitterPortalVisibleAtom
  );

  const [postBoxPortalVisible, setPostBoxPortalVisible] = useRecoilState(
    PostBoxPortalVisibleAtom
  );

  // 포탈 위치
  const roomPortalPosition = useRecoilValue(RoomPortalPositionAtom);
  const postOfficePortalPosition = useRecoilValue(PostOfficePortalPositionAtom);
  const storePortalPosition = useRecoilValue(StorePortalPositionAtom);
  const otherRoomPortalPosition = useRecoilValue(OtherRoomPortalPositionAtom);
  const worldPortalPosition = useRecoilValue(WorldPortalPositionAtom);
  const rankPortalPosition = useRecoilValue(RankPortalPositionAtom);
  const testPortalPosition = useRecoilValue(TestPortalPositionAtom);
  const instaPortalPosition = useRecoilValue(InstaPortalPositionAtom);
  const twitterPortalPosition = useRecoilValue(TwitterPortalPositionAtom);
  const postBoxPortalPosition = useRecoilValue(PostBoxPortalPositionAtom);

  // 랭킹모달 상태관리
  const closeRanking = () => {
    setIsArrived(false);
    setConfirmEnteringRank(false);
    setDefaultCameraPosition([2, 10, 10]);
    setDefaultCameraZoom(0.18);
  };

  // 우체국 도착 상태관리
  const [isPostOfficeVisible, setIsPostOfficeVisible] = useRecoilState(
    isPostOfficeVisibleAtom
  );
  const [isFinishPostOfficeVisible, setIsFinishPostOfficeVisible] =
    useRecoilState(isFinishPostOfficeVisibleAtom);
  const [onPostofficeCard, setOnPostOfficeCard] =
    useRecoilState(postofficeCardAtom);
  const [onPostofficeSendLetter, setOnPostofficeSendLetter] = useRecoilState(
    postofficeSendLetterAtom
  );
  const [isFinishPostOfficeCard, setIsFinishPostOfficeCard] = useRecoilState(
    finishPostofficeCardAtom
  );
  const [isFinishPostOfficeSendLetter, setIsFinishPostOfficeSendLetter] =
    useRecoilState(finishPostofficeSendLetterAtom);
  const [guide, setGuide] = useState(false);

  // 우체통 도착 상태관리
  const [isPostBoxVisible, setIsPostBoxVisible] =
    useRecoilState(isPostBoxVisibleAtom);
  const [isFinishPostBoxVisible, setIsFinishPostBoxVisible] = useRecoilState(
    isFinishPostBoxVisibleAtom
  );
  const [isReceiveLetterVisible, setIsReceiveLetterVisible] = useRecoilState(
    isReceiveLetterVisibleAtom
  );
  const [isFinishReceiveLetterVisible, setIsFinishReceiveLetterVisible] =
    useRecoilState(isFinishReceiveLetterVisibleAtom);
  const [isReportPostVisible, setIsReportPostVisible] = useRecoilState(
    reportPostVisibleAtom
  );
  // 선택된 편지 ID (신고하기 용)
  const selectedLetterId = useRecoilValue(letterIdAtom);

  // 가이드 관리
  useEffect(() => {
    if (localStorage.getItem("guideVisible")) {
      setGuide(false);
    } else {
      setGuide(true);
    }
  }, []);

  // 랭킹정보 모달 상태관리
  const [isRankingInformation, setIsRankingInformation] = useState(false);

  // 미니맵 모달 상태관리
  const [isMinimap, setIsMinimap] = useState(false);

  // 우체국 종료 확인 함수
  const finishPostOfficeHandler = () => {
    setIsFinishPostOfficeVisible(false);
    setIsPostOfficeVisible(false);
  };

  // 우표선택 종료 확인 함수
  const finishPostOfficeCardHandler = () => {
    setIsFinishPostOfficeCard(false);
    setOnPostOfficeCard(false);
  };

  // 편지작성 종료 확인 함수
  const finishPostOfficeSendLetter = () => {
    setIsFinishPostOfficeSendLetter(false);
    setOnPostofficeSendLetter(false);
  };

  // 편지함 종료 확인 함수
  const finishPostBoxHandler = () => {
    setIsFinishPostBoxVisible(false);
    setIsPostBoxVisible(false);
  };

  // 편지상세 종료 확인 함수
  const finishReceiveLetterHandler = () => {
    setIsFinishReceiveLetterVisible(false);
    setIsReceiveLetterVisible(false);
    setIsPostBoxVisible(true);
  };

  // 신고하기 모달 함수
  const reportPostHandler = () => {
    reportLetter(
      selectedLetterId,
      (success) => {
        setIsReportPostVisible(false);
        setIsReceiveLetterVisible(false);
        successMsg("✅ 신고가 정상적으로 접수됐습니다!");
      },
      (error) => {
        successMsg("❌ 신고하기에 실패했습니다.");
        console.log("Error at Report Post...", error);
      }
    );
  };

  // 미니맵 위치 관련 로직
  const [xPosition, setXPosition] = useState(81);
  const [yPosition, setYPosition] = useState(35);
  const [bigXPosition, setBigXPosition] = useState(139);
  const [bigYPosition, setBigYPosition] = useState(56);

  const [characterPosition, setCharacterPosition] = useRecoilState(
    CharacterPositionAtom
  );
  const position = sessionStorage.getItem("characterPosition");
  useEffect(() => {
    if (position) {
      // 작은 미니맵
      setXPosition(
        JSON.parse(position)[0] + 32 + (JSON.parse(position)[0] + 29) * 1.66
      );
      setYPosition(
        JSON.parse(position)[2] + 15 + (JSON.parse(position)[2] + 11) * 1.6
      );
      // 확대한 미니맵
      setBigXPosition(
        JSON.parse(position)[0] + 47 + (JSON.parse(position)[0] + 25) * 3.6
      );
      setBigYPosition(
        JSON.parse(position)[2] + 12.1 + (JSON.parse(position)[2] + 12) * 3.56
      );
    }
  }, [position]);
  return (
    <>
      <div className={styles.canvasContainer}>
        <SingleHeader checkMyRoom={"single"} />
        <Canvas shadows>
          {/* 사용자가 화면을 확대하거나 회전하지 못하도록 설정 */}
          <OrbitControls enableZoom={false} enableRotate={false} />
          {/* <OrbitControls /> */}

          {/* 전체 밝기 */}
          <ambientLight intensity={1.3} />

          {/* 그림자 조명 */}
          <DirectionalLight />

          {/* 카메라 */}
          <CustomCamera />

          {/* 화면 바탕 */}
          <Map />

          {/* 객체 */}
          <Model />
          {/* <Spot /> */}
          {/* <House /> */}

          {/* 외곽 경계 */}
          <PhysicsModel // 상
            position={[0, 0.005, -12.5]}
            rotation={[0, 0, 0]}
            size={[75, 0.3]}
          />
          <PhysicsModel //하
            position={[0, 0.005, 34.5]}
            rotation={[0, 0, 0]}
            size={[75, 0.3]}
          />
          <PhysicsModel //좌
            position={[-29.5, 0.005, 13]}
            rotation={[0, Math.PI / 2, 0]}
            size={[62, 0.3]}
          />
          <PhysicsModel //우
            position={[37, 0.005, 8]}
            rotation={[0, Math.PI / 2, 0]}
            size={[52, 0.3]}
          />

          {/* 집 경계 */}
          <PhysicsModel // 집 뒤
            position={[0.1, 0.005, -10.7]}
            rotation={[0, 0, 0]}
            size={[8, 0.3]}
          />
          <PhysicsModel // 집 앞
            position={[0.1, 0.005, -5.5]}
            rotation={[0, 0, 0]}
            size={[4, 0.3]}
          />
          <PhysicsModel //좌
            position={[-4.3, 0.005, -6.5]}
            rotation={[0, Math.PI / 2, 0]}
            size={[6, 0.3]}
          />

          <PhysicsModel //우
            position={[4.1, 0.005, -6.5]}
            rotation={[0, Math.PI / 2, 0]}
            size={[6, 0.3]}
          />
          <PhysicsModel // 집 앞 왼쪽
            position={[-2.4, 0.005, -3.5]}
            rotation={[0, 0, 0]}
            size={[2.2, 0.3]}
          />
          <PhysicsModel // 집 앞 오른쪽
            position={[3, 0.005, -3.5]}
            rotation={[0, 0, 0]}
            size={[2.6, 0.3]}
          />
          <PhysicsModel //  우체통
            position={[3.7, 0.005, -1]}
            rotation={[0, 0, 0]}
            size={[0.2, 0.3]}
          />

          {/* 우체국 경계 */}
          <PhysicsModel //뒤
            position={[17.5, 0.005, 6.5]}
            rotation={[0, 0, 0]}
            size={[9, 0.3]}
          />
          <PhysicsModel //좌
            position={[13.2, 0.005, 10]}
            rotation={[0, Math.PI / 2, 0]}
            size={[5.8, 0.3]}
          />
          <PhysicsModel //우
            position={[23.3, 0.005, 10]}
            rotation={[0, Math.PI / 2, 0]}
            size={[5.8, 0.3]}
          />
          <PhysicsModel //앞 좌
            position={[14, 0.005, 12.8]}
            rotation={[0, 0, 0]}
            size={[1.5, 0.3]}
          />
          <PhysicsModel //앞 우
            position={[20.5, 0.005, 12.8]}
            rotation={[0, 0, 0]}
            size={[5, 0.3]}
          />

          {/* 유령 앞 집 경계 */}
          <PhysicsModel //뒤
            position={[16.3, 0.005, 17]}
            rotation={[0, 0, 0]}
            size={[6.5, 0.3]}
          />
          <PhysicsModel //앞
            position={[16.3, 0.005, 24.5]}
            rotation={[0, 0, 0]}
            size={[6.5, 0.3]}
          />
          <PhysicsModel //우
            position={[20, 0.005, 21]}
            rotation={[0, Math.PI / 2, 0]}
            size={[7, 0.3]}
          />

          {/* 이웃마을 경계 */}
          <PhysicsModel // 뒤
            position={[-16.5, 0.005, 6]}
            rotation={[0, 0, 0]}
            size={[7.5, 0.3]}
          />
          <PhysicsModel // 집 앞
            position={[-16, 0.005, 9]}
            rotation={[0, 0, 0]}
            size={[8, 0.3]}
          />
          <PhysicsModel // 왼쪽 차 앞
            position={[-18.5, 0.005, 12.5]}
            rotation={[0, 0, 0]}
            size={[1, 0.3]}
          />
          <PhysicsModel // 오른쪽 차 앞
            position={[-13.5, 0.005, 12.5]}
            rotation={[0, 0, 0]}
            size={[1, 0.3]}
          />
          <PhysicsModel // 왼쪽 차 우
            position={[-17.7, 0.005, 11]}
            rotation={[0, Math.PI / 2, 0]}
            size={[2, 0.3]}
          />
          <PhysicsModel // 오른쪽 차 좌
            position={[-14.6, 0.005, 11]}
            rotation={[0, Math.PI / 2, 0]}
            size={[2, 0.3]}
          />
          <PhysicsModel // 좌
            position={[-20, 0.005, 10]}
            rotation={[0, Math.PI / 2, 0]}
            size={[8, 0.3]}
          />

          <PhysicsModel // 우
            position={[-12.5, 0.005, 10]}
            rotation={[0, Math.PI / 2, 0]}
            size={[8, 0.3]}
          />

          {/* 시상대 */}
          <PhysicsModel // 뒤
            position={[-16.3, 0.005, 17.5]}
            rotation={[0, 0, 0]}
            size={[7, 0.3]}
          />

          <PhysicsModel // 집 앞
            position={[-16.2, 0.005, 23.5]}
            rotation={[0, 0, 0]}
            size={[6.6, 0.3]}
          />

          <PhysicsModel // 좌
            position={[-19.5, 0.005, 20.4]}
            rotation={[0, Math.PI / 2, 0]}
            size={[6, 0.3]}
          />

          <PhysicsModel // 우
            position={[-17.5, 0.005, 20.4]}
            rotation={[0, Math.PI / 2, 0]}
            size={[6, 0.3]}
          />

          {/* 간판 */}
          <PhysicsModel //좌
            position={[-8.8, 0.005, -3]}
            rotation={[0, Math.PI / 4.8, 0]}
            size={[3, 0.3]}
          />

          {/* 분수대 */}
          <PhysicsModel // 상
            position={[0, 0.005, 12]}
            rotation={[0, 0, 0]}
            size={[3, 0.3]}
          />
          <PhysicsModel // 좌
            position={[-2.7, 0.005, 14.5]}
            rotation={[0, Math.PI / 2, 0]}
            size={[3, 0.3]}
          />

          <PhysicsModel // 우
            position={[3.3, 0.005, 15]}
            rotation={[0, Math.PI / 2, 0]}
            size={[2.4, 0.3]}
          />
          <PhysicsModel // 하
            position={[0, 0.005, 17.8]}
            rotation={[0, 0, 0]}
            size={[3.7, 0.3]}
          />
          <PhysicsModel // 좌상
            position={[-1.3, 0.005, 12]}
            rotation={[0, 0.5, 0]}
            size={[1.7, 0.3]}
          />
          <PhysicsModel // 우상
            position={[1.4, 0.005, 13.4]}
            rotation={[0, -0.9, 0]}
            size={[3, 0.3]}
          />
          <PhysicsModel // 좌하
            position={[-2, 0.005, 17]}
            rotation={[0, -0.9, 0]}
            size={[1.3, 0.3]}
          />
          <PhysicsModel // 우하
            position={[2.2, 0.005, 17.2]}
            rotation={[0, 0.5, 0]}
            size={[1.5, 0.3]}
          />

          {/* 이정표 */}
          <PhysicsModel // 이웃마을
            position={[-9.2, 0.005, 2.2]}
            rotation={[0, 0, 0]}
            size={[0.2, 0.3]}
          />
          <PhysicsModel // 우체국
            position={[5.4, 0.005, 2]}
            rotation={[0, 0, 0]}
            size={[0.2, 0.3]}
          />

          {/* 포탈 */}
          {roomPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringRoom}
              portalPosition={roomPortalPosition}
              setPortalVisible={setRoomPortalVisible}
              adjustedAngle={[0, 5, 12]}
              adjustedZoom={0.28}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={roomPortalPosition}
              portalVisible={setRoomPortalVisible}
              flag={0}
            />
          )}

          {postOfficePortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringPostOffice}
              portalPosition={postOfficePortalPosition}
              setPortalVisible={setPostOfficePortalVisible}
              adjustedAngle={[-5.5, 3.5, 10]}
              adjustedZoom={0.28}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={postOfficePortalPosition}
              portalVisible={setPostOfficePortalVisible}
              flag={0}
            />
          )}

          {otherRoomPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
              portalPosition={otherRoomPortalPosition}
              setPortalVisible={setOtherRoomPortalVisible}
              adjustedAngle={[0, 5, 9]}
              adjustedZoom={0.27}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={otherRoomPortalPosition}
              portalVisible={setOtherRoomPortalVisible}
              flag={0}
            />
          )}

          {worldPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringWorld}
              portalPosition={worldPortalPosition}
              setPortalVisible={setWorldPortalVisible}
              adjustedAngle={[0, 5, 11]}
              adjustedZoom={0.24}
              PortalSize={[1.5, 1.5]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={worldPortalPosition}
              portalVisible={setWorldPortalVisible}
              flag={1}
            />
          )}

          {rankPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringRank}
              portalPosition={rankPortalPosition}
              setPortalVisible={setRankPortalVisible}
              adjustedAngle={[20, 5.5, 5]}
              adjustedZoom={0.37}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={rankPortalPosition}
              portalVisible={setRankPortalVisible}
              flag={0}
            />
          )}

          {testPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringTest}
              portalPosition={testPortalPosition}
              setPortalVisible={setTestPortalVisible}
              adjustedAngle={[0, 5, 8]}
              adjustedZoom={0.27}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={testPortalPosition}
              portalVisible={setTestPortalVisible}
              flag={0}
            />
          )}

          {instaPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringInsta}
              portalPosition={instaPortalPosition}
              setPortalVisible={setInstaPortalVisible}
              adjustedAngle={[0, 5, 8]}
              adjustedZoom={0.27}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={instaPortalPosition}
              portalVisible={setInstaPortalVisible}
              flag={0}
            />
          )}

          {twitterPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringTwitter}
              portalPosition={twitterPortalPosition}
              setPortalVisible={setTwitterPortalVisible}
              adjustedAngle={[0, 5, 8]}
              adjustedZoom={0.27}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={twitterPortalPosition}
              portalVisible={setTwitterPortalVisible}
              flag={0}
            />
          )}

          {postBoxPortalVisible ? (
            <DefaultPortal
              setConfirmEnteringLocation={setConfirmEnteringPostBox}
              portalPosition={postBoxPortalPosition}
              setPortalVisible={setPostBoxPortalVisible}
              adjustedAngle={[-6, 2, 6]}
              adjustedZoom={0.35}
              PortalSize={[1, 1]}
            />
          ) : (
            <DefaultPortalRing
              portalPosition={postBoxPortalPosition}
              portalVisible={setPostBoxPortalVisible}
              flag={0}
            />
          )}
        </Canvas>
        {/* 가이드 페이지 */}
        {guide && (
          <GuidePage
            onClick={() => {
              localStorage.setItem("guideVisible", true);
              setGuide(false);
            }}
          />
        )}

        {/* 입장 확인 모달 */}
        {confirmEnteringRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"나의 방에 입장하기"}
                setConfirmEnteringLocation={setConfirmEnteringRoom}
                location={"house"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringPostOffice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"우체국에 입장하기"}
                setConfirmEnteringLocation={setConfirmEnteringPostOffice}
                location={"postOffice"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringStore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"방을 꾸밀 수 있는 가구 상점을 준비 중입니다!"}
                setConfirmEnteringLocation={setConfirmEnteringStore}
                location={"store"}
                flag={"0"}
              />
            </div>
          </motion.div>
        )}
        {confirmEnteringOtherRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 주민의 방 구경하기"}
                setConfirmEnteringLocation={setConfirmEnteringOtherRoom}
                location={"otherRoom"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}
        {/* 멀티 플레이 포탈 */}
        {confirmEnteringWorld && (
          <div className={styles.confirmModal}>
            <ConfirmEnteringDefaultModal
              modalContent={"딩동 광장으로 이동하시겠습니까?"}
              setConfirmEnteringLocation={setConfirmEnteringWorld}
              location={"world"}
              flag={"1"}
            />
          </div>
        )}

        {/* 우체국 모달 */}
        {isPostOfficeVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setIsPostOfficeVisible(false)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostOfficeModal />
              </div>
            </motion.div>
          </>
        )}

        {/* 우체국 종료 모달 */}
        {isFinishPostOfficeVisible && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostOfficeVisible(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"우체국을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostOfficeHandler()}
                cancelClick={() => setIsFinishPostOfficeVisible(false)}
              />
            </div>
          </>
        )}

        {/* 우표선택 모달 */}
        {onPostofficeCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setOnPostOfficeCard(false)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostofficeCardBox />
              </div>
            </motion.div>
          </>
        )}

        {/* 우표선택 모달 종료 */}
        {isFinishPostOfficeCard && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostOfficeCard(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"우표 선택을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostOfficeCardHandler()}
                cancelClick={() => setIsFinishPostOfficeCard(false)}
              />
            </div>
          </>
        )}

        {/* 편지보내기 모달 */}
        {onPostofficeSendLetter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setIsFinishPostOfficeSendLetter(true)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostofficeSendLetter />
              </div>
            </motion.div>
          </>
        )}

        {/* 편지보내기 종료 모달 */}
        {isFinishPostOfficeSendLetter && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostOfficeSendLetter(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"편지 작성을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostOfficeSendLetter()}
                cancelClick={() => setIsFinishPostOfficeSendLetter(false)}
              />
            </div>
          </>
        )}

        {/* 편지함 모달 */}
        {isPostBoxVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => setIsPostBoxVisible(false)}
              />
              <div className={styles.postofficemodalcontainer}>
                <PostBox />
              </div>
            </motion.div>
          </>
        )}

        {/* 편지함 종료 모달 */}
        {isFinishPostBoxVisible && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishPostBoxVisible(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"편지함을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishPostBoxHandler()}
                cancelClick={() => setIsFinishPostBoxVisible(false)}
              />
            </div>
          </>
        )}

        {/* 편지상세 모달 */}
        {isReceiveLetterVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={styles.InformationOverlay}
                onClick={() => {
                  setIsReceiveLetterVisible(false);
                  setIsPostBoxVisible(true);
                }}
              />
              <div className={styles.postofficemodalcontainer}>
                <ReceiveLetter />
              </div>
            </motion.div>
          </>
        )}

        {/* 편지상세 종료 모달 */}
        {isFinishReceiveLetterVisible && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsFinishReceiveLetterVisible(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"편지를 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => finishReceiveLetterHandler()}
                cancelClick={() => setIsFinishReceiveLetterVisible(false)}
              />
            </div>
          </>
        )}

        {/* 신고하기 모달 */}
        {isReportPostVisible && (
          <>
            <div
              className={styles.OverOverlay}
              onClick={() => setIsReportPostVisible(false)}
            />
            <div className={styles.FinishOverContainer}>
              <DefaultModal
                content={"신고하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => reportPostHandler()}
                cancelClick={() => setIsReportPostVisible(false)}
              />
            </div>
          </>
        )}

        {/* 랭킹모달 */}
        {confirmEnteringRank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={styles.overlay} onClick={() => closeRanking()} />
            <div className={styles.rankingModalContainer}>
              <img
                src={`${urlPath}/assets/icons/information-circle.png`}
                className={styles.Infromation}
                onClick={() => setIsRankingInformation(true)}
              />
              <RankingModal />
            </div>
          </motion.div>
        )}

        {/* 랭킹정보모달 */}
        {isRankingInformation && (
          <>
            <div
              className={styles.InformationOverlay}
              onClick={() => setIsRankingInformation(false)}
            />
            <div className={styles.RankingInformationContainer}>
              <RankingInformation />
            </div>
          </>
        )}

        {confirmEnteringTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"우표 유형 테스트 하러 가기"}
                setConfirmEnteringLocation={setConfirmEnteringTest}
                location={"Test"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringInsta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 인스타그램 구경하기"}
                setConfirmEnteringLocation={setConfirmEnteringInsta}
                location={"Insta"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringTwitter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"딩동 트위터 구경하기"}
                setConfirmEnteringLocation={setConfirmEnteringTwitter}
                location={"Twitter"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {confirmEnteringPostBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.confirmModal}>
              {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
              <ConfirmEnteringDefaultModal
                modalContent={"편지함 확인하기"}
                setConfirmEnteringLocation={setConfirmEnteringPostBox}
                location={"PostBox"}
                flag={"1"}
              />
            </div>
          </motion.div>
        )}

        {/* 확대한 미니맵 */}
        {isMinimap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div
              className={styles.overlay}
              onClick={() => setIsMinimap(false)}
            />

            <div className={styles.bigMinimap}>
              <img
                src={`${urlPath}/assets/images/bigbackground.png`}
                alt=""
                className={styles.bigMinimapImg}
              />
            </div>
            <div className={styles.redDotContainer}>
              <img
                src={`${urlPath}/assets/icons/redDot.png`}
                style={{
                  width: "15px",
                  height: "auto",
                  position: "absolute",
                  top: `${bigYPosition}px`,
                  left: `${bigXPosition}px`,
                }}
              />
            </div>
          </motion.div>
        )}

        {isMinimap ||
        isArrived ||
        guide ||
        confirmEnteringRoom ||
        confirmEnteringPostOffice ||
        confirmEnteringStore ||
        confirmEnteringOtherRoom ||
        confirmEnteringWorld ||
        isPostOfficeVisible ||
        isFinishPostOfficeVisible ||
        onPostofficeCard ||
        isFinishPostOfficeCard ||
        onPostofficeSendLetter ||
        isFinishPostOfficeSendLetter ||
        isPostBoxVisible ||
        isFinishPostBoxVisible ||
        isReceiveLetterVisible ||
        isFinishReceiveLetterVisible ||
        isReportPostVisible ||
        confirmEnteringRank ||
        isRankingInformation ||
        confirmEnteringTest ||
        confirmEnteringInsta ||
        confirmEnteringTwitter ||
        confirmEnteringPostBox ? null : (
          <div
            className={styles.minimapContainer}
            onClick={() => {
              setIsMinimap(true);
            }}
          >
            <img
              src={`${urlPath}/assets/icons/redDot.png`}
              style={{
                width: "10px",
                position: "absolute",
                top: `${yPosition}px`,
                left: `${xPosition}px`,
              }}
            />
            <img
              src={`${urlPath}/assets/images/minimap2.png`}
              className={styles.minimap}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleMainPage;
