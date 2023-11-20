// 라이브러리
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

// 스타일
import styles from "./Header.module.css";

// 이미지
import hamburger from "/assets/icons/hamburgerbar.svg";
import bell from "/assets/icons/bell.png";

// 컴포넌트
import NeighborAcceptModal from "../Modal/Neighbor/NeighborAcceptModal";
import RoomBtn from "../Button/Room/RoomBtn";
import NeighborListModal from "../Modal/Neighbor/NeighborListModal";
import DefaultModal from "../Modal/Default/DefaultModal";
import { successMsg } from "../../utils/customToast";
import RoomNameBtn from "../Button/Room/RoomNameBtn";

// Atom
import { userAtom } from "../../atom/UserAtom";
import { roomInfoAtom, roomHeartAtom } from "../../atom/RoomInfoAtom";

// API
import {
  fetchNeighborRequest,
  responseNeighborRequest,
  fetchNeighborList,
  deleteNeighbor,
} from "../../api/Neighbor";
import { fetchLogout, fetchUserSecession } from "../../api/User";
import { fetchInquiry } from "../../api/Cs";
import { setFCMTokenAtServer, deleteFCMTokenAtServer } from "@/api/FCM";

// FCM
import { getMessaging, getToken } from "firebase/messaging";

const Header = ({ checkMyRoom }) => {
  const navigate = useNavigate();

  // 햄버거메뉴바 상태관리
  const [isHamburger, setIsHamburger] = useState(false);
  // 알림 상태관리
  const [isAlarm, setIsAlarm] = useState(false);
  // 알림 리스트 상태관리
  const [alarms, setAlarms] = useState([]);
  // 알림 리스트 길이 상태관리
  const [alarmsLength, setAlarmsLength] = useState(0);
  // 이웃리스트 모달 상태관리
  const [isNeighborList, setIsNeighborList] = useState(false);
  // 이웃리스트 상태관리
  const [neighborList, setNeighborList] = useState([]);
  // 이웃리스트 리스트 길이 상태관리
  const [neighborListLength, setNeighborListLength] = useState(0);
  // 이웃리스트 이웃제거 모달 상태관리
  const [removeNeighborList, setRemoveNeighborList] = useState(false);
  // 제거하려는 이웃 아이디 상태관리
  const [removeNeighborId, setRemoveNeighborId] = useState(0);
  // 문의하기 모달 상태관리
  const [isInquiry, setIsInquiry] = useState(false);
  // 문의하기 내용 상태관리
  const [inquiryText, setInquiryText] = useState("");
  // 로그아웃 확인 모달 상태관리
  const [isRealLogout, setIsRealLogout] = useState(false);
  // 회원탈퇴 확인 모달 상태관리
  const [isRealSecession, setIsRealSecession] = useState(false);
  // 내 방가기 상태관리
  // const [isMyRoom, setIsMyRoom] = useState(false)
  // Push 알림 토글
  const [isPossiblePush, setIsPossiblePush] = useState(false);

  // 유저정보
  const userInfo = useRecoilValue(userAtom);
  const roomInfo = useRecoilValue(roomInfoAtom);
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;
  const [heartCount, setHeartCount] = useRecoilState(roomHeartAtom);

  // 유저요청 가져오기
  useEffect(() => {
    // 이웃 리스트
    fetchNeighborList(
      (success) => {
        setNeighborList(success.data.data);
        setNeighborListLength(success.data.data.length);
      },
      (error) => {
        console.log("Error at neighbor list...", error);
      }
    );
    // 이웃요청 리스트
    fetchNeighborRequest(
      (success) => {
        setAlarmsLength(success.data.data.length);
        setAlarms(success.data.data);
      },
      (error) => {
        console.log("Error at neighbor request...", error);
      }
    );
    const fcmToken = localStorage.getItem("FCMToken");
    if (fcmToken !== null) {
      setIsPossiblePush(true);
    }
  }, []);

  // 이웃요청 수락함수
  const acceptNeighborHandler = (id) => {
    responseNeighborRequest(
      { flag: "Y", neighborId: id },
      (response) => {
        setAlarmsLength(alarmsLength - 1);
        setAlarms((prev) => prev.filter((alarm) => alarm.neighborId !== id));
        successMsg("✅ 이웃 수락이 완료됐습니다!");
      },
      (error) => {
        console.log("Error in ResponseNeighborRequest ...", error);
      }
    );
  };

  // 이웃요청 거절함수
  const refuseNeighborHandler = (id) => {
    responseNeighborRequest(
      { flag: "N", neighborId: id },
      (response) => {
        setAlarmsLength(alarmsLength - 1);
        setAlarms((prev) => prev.filter((alarm) => alarm.neighborId !== id));
        successMsg("✅ 이웃 거절이 완료됐습니다!");
      },
      (error) => {
        console.log("Error in ResponseNeighborRequest ...", error);
      }
    );
  };

  // 이웃 리스트 - 집 방문 함수
  const goNeighborHomeHandler = (roomId) => {
    window.location.replace(`${urlPath}/room/${roomId}`);
  };

  // 이웃 리스트 - 이웃 삭제 모달 함수
  const removeNeighborCheckHandler = (memberId) => {
    setRemoveNeighborList(true);
    setRemoveNeighborId(memberId);
  };

  // 이웃 리스트 - 이웃 삭제 함수
  const removeNeighborHandler = (Id) => {
    deleteNeighbor(
      { memberId: Id },
      (response) => {
        setNeighborList((prev) => prev.filter((item) => item.memberId !== Id));
        setRemoveNeighborList(false);
        setNeighborListLength(neighborListLength - 1);
        successMsg("✅ 이웃이 정상적으로 삭제되었습니다!");
      },
      (error) => {
        console.log("Error with Delete Neighbor...", error);
      }
    );
  };

  // 문의하기 함수
  const inquiryHandler = () => {
    if (inquiryText.length < 5) {
      successMsg("❌ 5자 이상 작성해주세요.");
    } else {
      fetchInquiry(
        {
          category: "3",
          content: inquiryText,
        },
        (success) => {
          setIsInquiry(false);
          setIsHamburger(false);
          setInquiryText("");
          successMsg("✅ 문의하기가 완료됐습니다!");
        },
        (error) => {
          "Error at inquiry...", error;
        }
      );
    }
  };

  // 로그아웃 함수
  const logoutHandler = () => {
    fetchLogout(
      (success) => {
        successMsg("✅ 로그아웃 성공!");
      },
      (error) => {
        "Error at Logout...", error;
      }
    );
    localStorage.removeItem("userAtom");
    window.location.replace(`${urlPath}/login`);
  };

  // 회원탈퇴 함수
  const withdrawalHandler = () => {
    fetchUserSecession(
      (success) => {
        localStorage.removeItem("userAtom");
        window.location.replace(`${urlPath}/login`);
        successMsg("✅ 회원탈퇴 성공!");
      },
      (error) => {
        "Error at Secession...", error;
      }
    );
  };

  // 문의하기 버튼함수
  const inquiryCheckHandler = () => {
    setIsHamburger(false);
    setIsInquiry(true);
  };

  // 내 방가기 함수
  const goMyRoom = () => {
    const urlPath = import.meta.env.VITE_APP_ROUTER_URL;
    const roomNum = JSON.parse(localStorage.getItem("userAtom"));
    setIsHamburger(false);
    navigate(`${urlPath}/room/${roomNum.roomId}`);
  };

  // 내 방 체크 함수
  // useEffect(() => {
  //   const checkMyRoomHandler = () => {
  //     const roomCheckId = window.location.pathname.match(/\d+/g)
  //     const roomNum = JSON.parse(localStorage.getItem("userAtom"))
  //     if (roomCheckId == roomNum.roomId) {
  //       setIsMyRoom(true)
  //     } else {
  //       setIsMyRoom(false)
  //     }
  //   }
  //   checkMyRoomHandler()
  // }, [isHamburger])

  // 메뉴에 보일 이름
  const menuUserName = JSON.parse(localStorage.getItem("userAtom")).nickname;

  // FCM 설정
  const messaging = getMessaging();

  const getPermissionRequest = async () => {
    const permission = await Notification.requestPermission();
    return permission;
  };

  const pushToggleChange = async () => {
    if (!Notification) {
      return;
    }

    if (isPossiblePush === false) {
      setIsPossiblePush(true);
      const permission = await getPermissionRequest();
      if (permission === "denied") {
        setIsPossiblePush(false);
      } else {
        getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID })
          .then((currentToken) => {
            if (currentToken) {
              setFCMTokenAtServer(currentToken);
            } else {
              setIsPossiblePush(false);
              console.log(
                "No registration token available. Request permission to generate one."
              );
              return null;
            }
          })
          .catch((err) => {
            setIsPossiblePush(false);
            console.log("An error occurred while retrieving token. ", err);
            return null;
          });
      }
    } else if (isPossiblePush === true) {
      setIsPossiblePush(false);
      deleteFCMTokenAtServer();
      localStorage.removeItem("FCMToken");
    }
  };

  // 문의하기 200자 체크함수
  const checkMaxLength = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= 200) {
      setInquiryText(event.target.value);
    }
  };

  const [doubleClickHeartSave, setDoubleClickHeartSave] = useState(false);
  // 내방 하트 클릭 시 토스트 메세지
  const myRoomClickHeartToastMsg = () => {
    if (!doubleClickHeartSave) {
      successMsg("💌 딩동 ! 당그니 님이 편지를 보냈어요 !");
      setDoubleClickHeartSave(true);
    }
    setTimeout(() => {
      setDoubleClickHeartSave(false);
    }, 3000);
  };
  return (
    <>
      <div className={styles.wrap}>
        <div
          className={
            checkMyRoom === "invite" ? styles.inviteHeader : styles.header
          }
        >
          {checkMyRoom === "invite" ? (
            <div className={styles.userName}>{roomInfo}</div>
          ) : (
            <>
              <img
                src={hamburger}
                onClick={() => setIsHamburger(true)}
                className={styles.HamburgerButton}
              />
              {/* <div className={styles.userName}> */}
              {/* {checkMyRoom === "my" ? userInfo.nickname : roomInfo} */}
              <div className={styles.heartRoom}>
                <RoomNameBtn>
                  {checkMyRoom === "my" ? userInfo.nickname : roomInfo}
                </RoomNameBtn>
                <div className={styles.heartPosition}>
                  {checkMyRoom === "my" ? (
                    <img
                      src={`${urlPath}/assets/icons/fullHeart.png`}
                      onClick={myRoomClickHeartToastMsg}
                    />
                  ) : (
                    <img src={`${urlPath}/assets/icons/fullHeart.png`} />
                  )}
                  <p>{heartCount}</p>
                </div>
              </div>
              {/* </div> */}
              <img src={bell} onClick={() => setIsAlarm(true)} />
            </>
          )}
        </div>
      </div>

      {/* 이웃 리스트 */}
      {checkMyRoom === "my" && (
        <div className={styles.NeighborList}>
          <RoomBtn
            img={`${userInfo.avatarId}_crop`}
            onClick={() => setIsNeighborList(true)}
          />
        </div>
      )}

      {/* 이웃 리스트 모달 */}
      {isNeighborList && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsNeighborList(false)}
          />
          <div className={styles.NeighborListContainer}>
            <div className={styles.xButtonContainer}>
              <img
                src={`${urlPath}/assets/icons/x.png`}
                className={styles.AlarmX}
                onClick={() => setIsNeighborList(false)}
              />
            </div>
            {neighborListLength !== 0 ? (
              <div className={styles.NeighborItemContainer}>
                {neighborList.map((item) => (
                  <div key={item.memberId}>
                    <NeighborListModal
                      imgName={`${item.avatarId}_crop`}
                      nickname={item.nickname}
                      gohome={() => goNeighborHomeHandler(item.roomId)}
                      remove={() => removeNeighborCheckHandler(item.memberId)}
                      status={item.isActive}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.NoAlarm}>이웃이 없습니다!</div>
            )}
          </div>
        </>
      )}

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
              <div className={styles.Name}>{menuUserName}</div>
            </div>
            <div className={styles.ContentContainer}>
              {/* {isMyRoom ? (
                <></>
              ) : (
                <div className={styles.MenuButton} onClick={goMyRoom} style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}>
                  내 방 가기
                </div>
              )} */}
              <div
                className={styles.MenuButton}
                onClick={inquiryCheckHandler}
                style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}
              >
                <div style={{ height: "18px" }}>문의하기</div>
              </div>
              <div
                className={styles.MenuButton}
                onClick={() => setIsRealLogout(true)}
                style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}
              >
                <div style={{ height: "18px" }}>로그아웃</div>
              </div>
              {/* <div
                className={styles.MenuButton}
                onClick={() => setIsRealSecession(true)}
                style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}
              >
                회원탈퇴
              </div> */}
              {/* FCM 설정 */}
              <div
                className={`${styles.MenuButton} ${styles.toggleContainer} `}
                style={{ borderBottom: "1px solid rgba(194, 194, 194, 0.5)" }}
              >
                <div style={{ height: "18px" }}>푸시알림</div>
                <div
                  className={`${styles.toggleSwitch} ${
                    isPossiblePush === true ? styles.checkedToggle : ""
                  }`}
                  onClick={pushToggleChange}
                >
                  <div
                    className={`${styles.toggleButton} ${
                      isPossiblePush === true ? styles.checkedToggleSwitch : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.FooterContainer}>
              <div className={styles.Version}>v 1.3.0</div>
              <div
                className={styles.exitButton}
                onClick={() => setIsRealSecession(true)}
              >
                <div style={{ height: "18px" }}>배경음악</div>
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

      {/* 이웃리스트의 아이템 제거를 물어보는 모달 */}
      {removeNeighborList && (
        <>
          <div
            className={styles.RemoveOverlay}
            onClick={() => setRemoveNeighborList(false)}
          />
          <div className={styles.RemoveNeighborContainer}>
            <DefaultModal
              content={"정말 이웃을 삭제하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => removeNeighborHandler(removeNeighborId)}
              cancelClick={() => setRemoveNeighborList(false)}
            />
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
  );
};

export default Header;
