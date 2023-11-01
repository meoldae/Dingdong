import { useEffect, useState } from "react";
import { userAtom } from "@/atom/UserAtom";
import DefaultBtn from "../../components/Button/Default/DefaultBtn";
import Card from "../../components/UI/Card";
import styles from "./PostofficeSendLetter.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { postofficeSendLetterAtom } from "../../atom/PostAtom";
import { sendLetterSNS } from "../../api/Letter";
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";

const PostofficeSendLetter = ({ card }) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const [content, setContent] = useState("");
  const [contentCount, setContentCount] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const [toValue, setToValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [onPostofficeSendLetter, setOnPostofficeSendLetter] = useRecoilState(
    postofficeSendLetterAtom
  );
  const userInfo = useRecoilValue(userAtom);
  const sendClick = () => {
    if (isSending) return;
    const newID =  String(uuidv4());
    console.log(newID)
    const letterData = {
      letterId: newID,
      letterTo: toValue,
      letterFrom: fromValue,
      description: content,
      stampId: card.idx,
    }

    const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY; 
    sendLetterSNS(letterData,(response)=>{ 
      
      // if (!window.Kakao.isInitialized()) {
      //   window.Kakao.init(JS_KEY)
      // } 

      // window.Kakao.Share.sendCustom({
      //   templateId: 100120,
      //   templateArgs: {
      //     THU: kakaoUrl,
      //     TITLE: `딩동! ${userInfo.nickname}님의 집에 편지를 보내주세요.`, //"딩동! 우리집을 방문해보세요.",
      //     DESC: recoilText,
      //     MOBILE_LINK: currentUrl,
      //     WEB_LINK: currentUrl,
      //   },
      // })
      console.log(response)
    })
  };

  const handleCheckContentCount = (event) => {
    setContent(event.target.value);
    setContentCount(event.target.value.length);
  };
  const handleToInputChange = (event) => {
    setToValue(event.target.value);
  };
  const handleFromInputChange = (event) => {
    setFromValue(event.target.value);
  };

  return (
    <>
      <div
      className={styles.overlays}
        onClick={() => {
          setOnPostofficeSendLetter(false);
        }}
      />
      <div className={styles.overlay}>
        <div className={styles.sendLetterContainer} id="sendLetter">
          <Card className={styles.sendLetterBox}>
            <div
              className={styles.xmarkImg}
              onClick={() => {
                setOnPostofficeSendLetter(false);
              }}
            >
              <img src={`${urlPath}/assets/icons/Pink_X-mark.png`} alt="" />
            </div>
            <img
              className={styles.topPostCardImg}
              src={`${urlPath}/assets/images/post/${card.src}`}
            />
            <div className={styles.ToUser}>
              To.
              <input
                type="text"
                value={toValue}
                onChange={handleToInputChange}
                placeholder="입력하세요."
                maxLength="7"
              />
            </div>
            <div className={styles.letterContent}>
              <textarea
                value={content}
                onChange={(e) => handleCheckContentCount(e)}
                placeholder="편지 내용을 작성하세요."
                maxLength={199}
              />
            </div>
            <div className={styles.contentCount}>{contentCount}/200</div>
            <div className={styles.footerContainer}>
              {/* <div className={styles.anonymous}>
              <span>체크박스</span>
              <span>익명의 이웃</span>
            </div> */}
              <div className={styles.FromUser}>
                From.
                <input
                  type="text"
                  value={fromValue}
                  placeholder="입력하세요."
                  onChange={handleFromInputChange}
                  maxLength="7"
                />
              </div>
            </div>
          </Card>
          <DefaultBtn
            btnName={"편지 보내기"}
            onClick={sendClick}
            color={"#F2CBE4"}
          />
        </div>
      </div>
    </>
  );
};

export default PostofficeSendLetter;
