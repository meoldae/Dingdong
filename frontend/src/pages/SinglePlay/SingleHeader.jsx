// 라이브러리
import { useEffect, useState, useRef } from "react"
import { useRecoilValue } from "recoil"

// 스타일
import styles from "./SingleHeader.module.css"

// 이미지
import hamburger from "/assets/icons/hamburgerbar.svg"
import bell from "/assets/icons/bell.png"

// 컴포넌트
import NeighborAcceptModal from "../../components/Modal/Neighbor/NeighborAcceptModal"
import DefaultModal from "../../components/Modal/Default/DefaultModal"
import { successMsg } from "../../utils/customToast"
import RoomNameBtn from "../../components/Button/Room/RoomNameBtn"

// API
import {
  fetchNeighborRequest,
  responseNeighborRequest,
  fetchNeighborList,
} from "../../api/Neighbor"
import { fetchLogout, fetchUserSecession } from "../../api/User"
import { fetchInquiry } from "../../api/Cs"
import { setFCMTokenAtServer, deleteFCMTokenAtServer } from "@/api/FCM"

// Atom
import { userAtom } from "../../atom/UserAtom"

// FCM
import { getMessaging, getToken} from "firebase/messaging";

const SingleHeader = ({ checkMyRoom }) => {
  // 햄버거메뉴바 상태관리
  const [isHamburger, setIsHamburger] = useState(false)
  // 알림 상태관리
  const [isAlarm, setIsAlarm] = useState(false)
  // 알림 리스트 상태관리
  const [alarms, setAlarms] = useState([])
  // 알림 리스트 길이 상태관리
  const [alarmsLength, setAlarmsLength] = useState(0)
  // 이웃리스트 상태관리
  const [neighborList, setNeighborList] = useState([])
  // 이웃리스트 리스트 길이 상태관리
  const [neighborListLength, setNeighborListLength] = useState(0)
  // 문의하기 모달 상태관리
  const [isInquiry, setIsInquiry] = useState(false)
  // 문의하기 내용 상태관리
  const [inquiryText, setInquiryText] = useState("")
  // 로그아웃 확인 모달 상태관리
  const [isRealLogout, setIsRealLogout] = useState(false)
  // 회원탈퇴 확인 모달 상태관리
  const [isRealSecession, setIsRealSecession] = useState(false)
  // Push 알림 토글
  const [isPossiblePush, setIsPossiblePush] = useState(false)
  // 배경음악 플레이 유무
  const [isBGM, setIsBGM] = useState(false)
  const audioRef = useRef(null);

  // 유저정보
  const userInfo = useRecoilValue(userAtom)


  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 유저요청 가져오기
  useEffect(() => {
    // 이웃 리스트
    fetchNeighborList(
      (success) => {
        setNeighborList(success.data.data)
        setNeighborListLength(success.data.data.length)
      },
      (error) => {
        console.log("Error at neighbor list...", error)
      }
    )
    // 이웃요청 리스트
    fetchNeighborRequest(
      (success) => {
        setAlarmsLength(success.data.data.length)
        setAlarms(success.data.data)
      },
      (error) => {
        console.log("Error at neighbor request...", error)
      }
    )
    const fcmToken = localStorage.getItem("FCMToken")
    if (fcmToken !== null) {
      setIsPossiblePush(true)
    }
    const localBGMFlag = localStorage.getItem("isBGM")
    if (localBGMFlag == "true"){
      setIsBGM(true);
    }
  }, [])

  // 이웃요청 수락함수
  const acceptNeighborHandler = (id) => {
    responseNeighborRequest(
      { flag: "Y", neighborId: id },
      (response) => {
        setAlarmsLength(alarmsLength - 1)
        setAlarms((prev) => prev.filter((alarm) => alarm.neighborId !== id))
        successMsg("✅ 이웃 수락이 완료됐습니다!")
      },
      (error) => {
        console.log("Error in ResponseNeighborRequest ...", error)
      }
    )
  }

  // 이웃요청 거절함수
  const refuseNeighborHandler = (id) => {
    responseNeighborRequest(
      { flag: "N", neighborId: id },
      (response) => {
        setAlarmsLength(alarmsLength - 1)
        setAlarms((prev) => prev.filter((alarm) => alarm.neighborId !== id))
        successMsg("✅ 이웃 거절이 완료됐습니다!")
      },
      (error) => {
        console.log("Error in ResponseNeighborRequest ...", error)
      }
    )
  }

  // 문의하기 함수
  const inquiryHandler = () => {
    if (inquiryText.length < 5) {
      successMsg("❌ 5자 이상 작성해주세요.")
    } else {
      fetchInquiry(
        {
          category: "3",
          content: inquiryText,
        },
        (success) => {
          setIsInquiry(false)
          setIsHamburger(false)
          setInquiryText("")
          successMsg("✅ 문의하기가 완료됐습니다!")
        },
        (error) => {
          "Error at inquiry...", error
        }
      )
    }
  }

  // 로그아웃 함수
  const logoutHandler = () => {
    fetchLogout(
      (success) => {
        localStorage.removeItem("userAtom")
        window.location.replace(`${urlPath}/login`)
        successMsg("✅ 로그아웃 성공!")
      },
      (error) => {
        "Error at Logout...", error
      }
    )
  }

  // 회원탈퇴 함수
  const withdrawalHandler = () => {
    fetchUserSecession(
      (success) => {
        localStorage.removeItem("userAtom")
        window.location.replace(`${urlPath}/login`)
        successMsg("✅ 회원탈퇴 성공!")
      },
      (error) => {
        "Error at Secession...", error
      }
    )
  }

  // 문의하기 버튼함수
  const inquiryCheckHandler = () => {
    setIsHamburger(false)
    setIsInquiry(true)
  }

  // FCM 설정
  const messaging = getMessaging();

  const getPermissionRequest = async () => {
    const permission = await Notification.requestPermission();
    return permission;
  }

  // FCM 알림 권한 설정
  const pushToggleChange = async () => {
    if (!Notification) {
      return;
    }

    if (isPossiblePush === false) {
      setIsPossiblePush(true)
      const permission = await getPermissionRequest();
      if (permission === "denied") {
        setIsPossiblePush(false)
      } else {
        getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID })
        .then((currentToken) => {
          if (currentToken) {
            setFCMTokenAtServer(currentToken);
          } else {
            setIsPossiblePush(false);
            console.log('No registration token available. Request permission to generate one.');
            return null;
          }
        }).catch((err) => {
          setIsPossiblePush(false);
          console.log('An error occurred while retrieving token. ', err);
          return null;
        });
      }
    } else if (isPossiblePush === true) {
      setIsPossiblePush(false);
      deleteFCMTokenAtServer();
      localStorage.removeItem("FCMToken");
    }
  }

  // BGM 재생 관련
  const playSound = () => {
    console.log("Play Sound")
    const audioElement = audioRef.current;
    audioElement.play();
  };

  const pauseSound = () => {
    console.log("Pause Sound ")
    const audioElement = audioRef.current;
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  const bgmToggleChange = async () => {
    localStorage.setItem("isBGM", !isBGM);
    setIsBGM(prev => !prev);
  };

  useEffect(() => {
    console.log("isBGM : ", isBGM);
    if (isBGM) {
      playSound();
    } else {
      pauseSound();
    }
  }, [isBGM])


  // 문의하기 200자 체크함수
  const checkMaxLength = (event) => {
    const inputValue = event.target.value

    if (inputValue.length <= 200) {
      setInquiryText(event.target.value)
    }
  }

  return (
    <>
      <div className={styles.wrap}>
        <audio ref={audioRef} loop>
          <source src={`${urlPath}/assets/musics/BGM.mp3`} type="audio/mp3" />
        </audio>
        <div className={styles.header}>
          <img
            src={hamburger}
            onClick={() => setIsHamburger(true)}
            className={styles.HamburgerButton}
          />
          <div className={styles.Name}>
            {checkMyRoom === "single" ? (
              <RoomNameBtn>딩동 마을</RoomNameBtn>
            ) : (
              <RoomNameBtn>딩동 광장</RoomNameBtn>
            )}
            
          </div>
          {/* </div> */}
          <img src={bell} onClick={() => setIsAlarm(true)} />
        </div>
      </div>

      {/* 햄버거 바 */}
      {isHamburger && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsHamburger(false)}
          />
          <div className={styles.HamburgerModal}>
            <div className={styles.XContainer}>
              <img
                src={`${urlPath}/assets/icons/Pink_X-mark.png`}
                className={styles.XImage}
                onClick={() => setIsHamburger(false)}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.Name}>{userInfo.nickname}</div>
            </div>
            <div className={styles.ContentContainer}>
              <div
                className={styles.MenuButton}
                onClick={inquiryCheckHandler}
                style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)"}}
              >
                <div style={{height: "18px"}}>문의하기</div>
                
              </div>
              <div
                className={styles.MenuButton}
                onClick={() => setIsRealLogout(true)}
                style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)"}}
              >
                <div style={{height: "18px"}}>로그아웃</div>
              </div>
              <div className={`${styles.MenuButton} ${styles.toggleContainer} `} style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}>
                <div style={{height: "18px"}}>푸시알림</div>
                
                <div className={`${styles.toggleSwitch} ${isPossiblePush === true ? styles.checkedToggle : ''}`} onClick={pushToggleChange}>
                  <div className={`${styles.toggleButton} ${isPossiblePush === true ? styles.checkedToggleSwitch : ''}`}/> 
                </div>

              </div>
              <div className={`${styles.MenuButton} ${styles.toggleContainer} `} style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}>
                <div style={{height: "18px"}}>배경음악</div>
                
                <div className={`${styles.toggleSwitch} ${isBGM === true ? styles.checkedToggle : ''}`} onClick={bgmToggleChange}>
                  <div className={`${styles.toggleButton} ${isBGM === true ? styles.checkedToggleSwitch : ''}`}/> 
                </div>

              </div>
            </div>
            <div className={styles.FooterContainer}>
              <div className={styles.Version}>v 1.3.0</div>
              <div
                className={styles.exitButton}
                onClick={() => setIsRealSecession(true)}
              >
                회원 탈퇴
              </div>
            </div>
          </div>
        </>
      )}

      {/* 알림 */}
      {isAlarm && (
        <>
          <div className={styles.Overlay} onClick={() => setIsAlarm(false)} />
          <div className={styles.AlarmContainer}>
            <div className={styles.xButtonContainer}>
              <img
                src={`${urlPath}/assets/icons/x.png`}
                className={styles.AlarmX}
                onClick={() => setIsAlarm(false)}
              />
            </div>
            {alarmsLength !== 0 ? (
              <div className={styles.alarmListContainer}>
                {alarms.map((alarm) => (
                  <div key={alarm.neighborId} className={styles.AlarmModal}>
                    <NeighborAcceptModal
                      content={alarm.nickname}
                      okClick={() => acceptNeighborHandler(alarm.neighborId)}
                      cancelClick={() =>
                        refuseNeighborHandler(alarm.neighborId)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.NoAlarm}>알림이 없습니다!</div>
            )}
          </div>
        </>
      )}

      {/* 문의하기 모달 */}
      {isInquiry && (
        <>
          <div
            className={styles.RemoveOverlay}
            onClick={() => setIsInquiry(false)}
          />
          <div className={styles.InquiryContainer}>
            <div className={styles.InquiryTitle}>문의하기</div>
            <div className={styles.LineContainer}>
              <div className={styles.InquiryLine} />
            </div>
            <div className={styles.InquiryContentContainer}>
              <textarea
                className={styles.InquiryContent}
                placeholder="문의할 내용을 작성해주세요."
                value={inquiryText}
                onChange={(e) => checkMaxLength(e)}
                maxLength={200}
                style={{ fontFamily: "GmarketSansMedium" }}
              />
            </div>
            <div className={styles.InquiryTextLength}>
              {inquiryText.length}/200
            </div>
            <div className={styles.InquiryButtonContainer}>
              <div className={styles.InquiryButton} onClick={inquiryHandler}>
                완료
              </div>
            </div>
          </div>
        </>
      )}

      {/* 로그아웃 확인 모달 */}
      {isRealLogout && (
        <>
          <div
            className={styles.RemoveOverlay}
            onClick={() => setIsRealLogout(false)}
          />
          <div className={styles.RemoveNeighborContainer}>
            <DefaultModal
              content={"정말 로그아웃을 하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={logoutHandler}
              cancelClick={() => setIsRealLogout(false)}
            />
          </div>
        </>
      )}

      {/* 회원탈퇴 확인 모달 */}
      {isRealSecession && (
        <>
          <div
            className={styles.RemoveOverlay}
            onClick={() => setIsRealSecession(false)}
          />
          <div className={styles.RemoveNeighborContainer}>
            <DefaultModal
              content={"정말 회원탈퇴를 하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={withdrawalHandler}
              cancelClick={() => setIsRealSecession(false)}
            />
          </div>
        </>
      )}
    </>
  )
}

export default SingleHeader
