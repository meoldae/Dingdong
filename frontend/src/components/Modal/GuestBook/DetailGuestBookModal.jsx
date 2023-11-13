// 라이브러리
import { useRecoilValue, useSetRecoilState } from "recoil";

// Atom
import {
  guestBookDetailContentAtom,
  reportGuestBookAtom,
} from "../../../atom/GuestBookAtom";
import { roomInfoAtom } from "../../../atom/RoomInfoAtom";

// 스타일
import styles from "./DetailGuestBookModal.module.css";
import { useEffect, useState } from "react";

const DetailGuestBookModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 현재 방 번호
  const [nowUserId, setNowUserId] = useState();
  const nowRoomId = window.location.pathname.match(/\d+/g)[0];
  useEffect(() => {
    if (localStorage.getItem("userAtom")) {
      setNowUserId(JSON.parse(localStorage.getItem("userAtom")).roomId);
    } else {
      setNowUserId(false);
    }
  },[]);

  // 리코일 상태관리
  const guestBookDetailContent = useRecoilValue(guestBookDetailContentAtom);
  const roomInfo = useRecoilValue(roomInfoAtom);
  const setIsReportGuestBookVisible = useSetRecoilState(reportGuestBookAtom);

  // 시간 변경 함수
  const changeTimeHandler = (time) => {
    const writedTime = new Date(time);
    const nowTime = new Date();

    const diffTime = nowTime - writedTime;

    // 시간, 일, 주, 월, 년 단위로 변환
    const minutesDiff = diffTime / (1000 * 60);
    const hoursDiff = minutesDiff / 60;
    const daysDiff = hoursDiff / 24;
    const weeksDiff = daysDiff / 7;
    const monthsDiff = daysDiff / 30;
    const yearsDiff = daysDiff / 365;

    // 가장 적절한 단위로 결과 반환
    if (yearsDiff > 1) {
      return `${Math.floor(yearsDiff)}년 전 작성`;
    } else if (monthsDiff > 1) {
      return `${Math.floor(monthsDiff)}개월 전 작성`;
    } else if (weeksDiff > 1) {
      return `${Math.floor(weeksDiff)}주 전 작성`;
    } else if (daysDiff > 1) {
      return `${Math.floor(daysDiff)}일 전 작성`;
    } else {
      return `${Math.floor(hoursDiff)}시간 전 작성`;
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. {roomInfo}</div>
        <div className={styles.ContentContainer}>
          <div
            className={styles.Content}
            style={{
              fontFamily: "GangwonEduAll-Light",
              backgroundImage: `url(${urlPath}/assets/icons/postit${guestBookDetailContent.color}.png)`,
              backgroundSize: "250px 250px",
              backgroundRepeat: "no-repeat"
            }}
            dangerouslySetInnerHTML={{ __html: guestBookDetailContent?.description.replaceAll('\n', '<br />') }}
          />
            {/* {guestBookDetailContent.description}
          </div> */}
        </div>
        <div className={styles.TimeContainer}>
          <div className={styles.Time}>
            {changeTimeHandler(guestBookDetailContent.writeTime)}
          </div>
        </div>
        <div className={styles.FooterContainer}>
          {nowRoomId == nowUserId && (
            <div
              className={styles.Report}
              onClick={() => setIsReportGuestBookVisible(true)}
            >
              신고하기
            </div>
          )}
          <div
            className={styles.Footer}
            style={
              nowRoomId == nowUserId ? { width: "300px", textAlign: "end" } : {}
            }
          >
            From. {guestBookDetailContent.nickname}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailGuestBookModal;
