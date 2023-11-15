import styles from "./InviteFooter.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  isDetailGuestBookVisibleAtom,
  isFinishDetailGuestBookVisibleAtom,
  isFinishGuestBookVisibleAtom,
  isFinishWriteGuestBookVisibleAtom,
  isGuestBookVisibleAtom,
  isWriteGuestBookVisibleAtom,
} from "../../atom/GuestBookAtom";
import GuestBookModal from "../Modal/GuestBook/GuestBookModal";
import DefaultModal from "../Modal/Default/DefaultModal";
import DetailGuestBookModal from "../Modal/GuestBook/DetailGuestBookModal";
import WriteGuestBookModal from "../Modal/GuestBook/WriteGuestBookModal";
const OtherFooter = (props) => {
  const navigate = useNavigate();

  const [isGuestBookVisible, setIsGuestBookVisible] = useRecoilState(
    isGuestBookVisibleAtom
  );
  const [isFinishGuestBookVisible, setIsFinishGuestBookVisible] =
    useRecoilState(isFinishGuestBookVisibleAtom);
  const [isDetailGuestBookVisible, setIsDetailGuestBookVisible] =
    useRecoilState(isDetailGuestBookVisibleAtom);
  const [isWriteGuestBookVisible, setIsWriteGuestBookVisible] = useRecoilState(
    isWriteGuestBookVisibleAtom
  );
  const [isFinishWriteGuestBookVisible, setIsFinishWriteGuestBookVisible] =
    useRecoilState(isFinishWriteGuestBookVisibleAtom);

  const [isFinishDetailGuestBookVisible, setIsFinishDetailGuestBookVisible] =
    useRecoilState(isFinishDetailGuestBookVisibleAtom);

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;

  const onHomeHandler = (e) => {
    navigate(`${urlPath}/login`);
  };

  const finishGuestBookListHandler = () => {
    setIsFinishGuestBookVisible(false);
    setIsGuestBookVisible(false);
  };

  const finishDetailGuestBookHandler = () => {
    setIsFinishDetailGuestBookVisible(false);
    setIsDetailGuestBookVisible(false);
    setIsGuestBookVisible(true);
  };

  const finishWriteGuestBookHandler = () => {
    setIsFinishWriteGuestBookVisible(false);
    setIsWriteGuestBookVisible(false);
    setIsGuestBookVisible(true);
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.inviteFooter}>
          <div className={styles.background}>
              <div className={styles.circle} onClick={onHomeHandler}>
                <div className={styles.button}>
                  <img
                    src={`${urlPath}/assets/images/house.png`}
                    className={styles.iconImage}
                  />
                  <div className={styles.buttonContent}>딩동 시작하기</div>
                </div>
              </div>
              <div
                className={styles.circle}
                onClick={() => {
                  setIsGuestBookVisible(true);
                }}
              >
                <div className={styles.button}>
                  <img
                    src={`${urlPath}/assets/icons/guestbook.png`}
                    className={styles.iconImage}
                  />
                  <div className={styles.buttonContent}>방명록 남기기</div>
                </div>
              </div>
          </div>
        </div>
      </div>
      {isGuestBookVisible && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsGuestBookVisible(false)}
          />
          <div className={styles.GuestBookContainer}>
            <GuestBookModal />
          </div>
        </>
      )}
      {isFinishGuestBookVisible && (
        <>
          <div
            className={styles.OverOverlay}
            onClick={() => setIsFinishGuestBookVisible(false)}
          />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"방명록을 종료하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => finishGuestBookListHandler()}
              cancelClick={() => setIsFinishGuestBookVisible(false)}
            />
          </div>
        </>
      )}
      {isWriteGuestBookVisible && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsFinishWriteGuestBookVisible(true)}
          />
          <div className={styles.GuestBookContainer}>
            <WriteGuestBookModal check={true} />
          </div>
        </>
      )}

      {/* 방명록 작성 종료 모달 */}
      {isFinishWriteGuestBookVisible && (
        <>
          <div
            className={styles.OverOverlay}
            onClick={() => setIsFinishWriteGuestBookVisible(false)}
          />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"방명록 작성을 종료하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => finishWriteGuestBookHandler()}
              cancelClick={() => setIsFinishWriteGuestBookVisible(false)}
            />
          </div>
        </>
      )}

      {/* 방명록 상세 모달 */}
      {isDetailGuestBookVisible && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => {
              setIsDetailGuestBookVisible(false);
              setIsGuestBookVisible(true);

            }}
          />
          <div className={styles.GuestBookContainer}>
            <DetailGuestBookModal />
          </div>
        </>
      )}

      {/* 방명록 상세 종료 모달 */}
      {isFinishDetailGuestBookVisible && (
        <>
          <div
            className={styles.OverOverlay}
            onClick={() => setIsFinishDetailGuestBookVisible(false)}
          />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"방명록 상세를 그만 보시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => finishDetailGuestBookHandler()}
              cancelClick={() => setIsFinishDetailGuestBookVisible(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default OtherFooter;
