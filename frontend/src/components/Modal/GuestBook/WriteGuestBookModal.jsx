// 라이브러리
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// 컴포넌트
import { successMsg } from "../../../utils/customToast";

// API
import { fetchGuesteWriteGuestBook, fetchWriteGuestBook } from "../../../api/GuestBook";

// Atom
import {
  isGuestBookVisibleAtom,
  isWriteGuestBookVisibleAtom,
} from "../../../atom/GuestBookAtom";
import { roomInfoAtom } from "../../../atom/RoomInfoAtom";

// 스타일
import styles from "./WriteGuestBookModal.module.css";

const WriteGuestBookModal = ({ check }) => {
  // 방 사용자 정보
  const roomInfo = useRecoilValue(roomInfoAtom);
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 방명록 작성 내용
  const [content, setContent] = useState("")
  // 색상코드 상태관리
  const [isColor, setIsColor] = useState(0);

  // 리코일 상태관리
  const setIsGusetBookVisible = useSetRecoilState(isGuestBookVisibleAtom);
  const setIsWriteGuestBookVisible = useSetRecoilState(
    isWriteGuestBookVisibleAtom
  );

  // 방명록 작성 내용 함수
  const checkContentHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= 75) {
      setContent(event.target.value)
    }
  };

  // 색상 아이템
  const colorList = [
    "#FFD2E1", // 0: 빨간색
    "#FFDEC2", // 1: 주황색
    "#FFF0CA", // 2: 노란색
    "#DFEED1", // 3: 연두색
    "#83C3FF", // 4: 파란색
    "#D2CCFF", // 5: 보라색
    "#BFBFBF", // 6: 검정색
  ]

  // 그림자 색상 아이템
  const shadowList = [
    "#91053d",
    "#C15900",
    "#916705",
    "#377300",
    "#004699",
    "#4F00B3",
    "#313332",
  ]

  // 랜덤 각도 생성 함수
  const randomDegree = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // 방명록 작성 함수
  const WriteGuestBookHandler = () => {
    if (content === "") {
      successMsg("❌ 내용을 작성해주세요!");
    } else {
      const nowRoomId = window.location.pathname.match(/\d+/g)[0]
      const degree = randomDegree(-15, 15)
      const params = {
        roomId: nowRoomId,
        description: content.replaceAll("<br>","\r\n"),
        color: isColor,
        rotate: degree,
      };
      if (check) {
        fetchGuesteWriteGuestBook(
          params,
          (success) =>{
            setIsWriteGuestBookVisible(false);
            setIsGusetBookVisible(true);
            successMsg("✅ 방명록을 남겼습니다!");
          },(error) =>{
            console.log("Error at writeGuestBook...", error);
            successMsg("❌ 방명록 작성 중에 문제가 발생했습니다.");
          }
        )
      } else {
        fetchWriteGuestBook(
          params,
          (success) => {
            setIsWriteGuestBookVisible(false);
            setIsGusetBookVisible(true);
            successMsg("✅ 방명록을 남겼습니다!");
          },
          (error) => {
            console.log("Error at writeGuestBook...", error);
            successMsg("❌ 방명록 작성 중에 문제가 발생했습니다.");
          }
        );
      }
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. {roomInfo}</div>
        <div className={styles.ContentContainer}>
          <textarea
            value={content}
            onChange={(e) => checkContentHandler(e)}
            placeholder="방명록을 남겨보세요!&#10;75자까지 작성할 수 있습니다!"
            maxLength={75}
            spellCheck="false"
            style={{
              fontFamily: "GangwonEduAll-Light",
              backgroundImage: `url(${urlPath}/assets/icons/postit${isColor}.png)`,
              backgroundSize: "250px 250px",
              backgroundRepeat: "no-repeat"
            }}
          />
        </div>
        <div className={styles.ColorContainer}>
          <div className={styles.Colors}>
            {colorList.map((color, index) => (
              <div
                key={index}
                className={styles.ColorCircle}
                onClick={() => setIsColor(index)}
                style={{
                  background: color,
                  width: isColor === index ? "30px" : "25px",
                  height: isColor === index ? "30px" : "25px"
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <div
            className={styles.Button}
            style={{ background: `${colorList[isColor]}`, boxShadow: `0px 4px 2px ${shadowList[isColor]}` }}
            onClick={() => WriteGuestBookHandler()}
          >
            방명록 남기기
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteGuestBookModal;
