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
    sendLetterSNS(letterData,(response)=>{
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
              <img src="/assets/icons/Pink_X-mark.png" alt="" />
            </div>
            <img
              className={styles.topPostCardImg}
              src={`/assets/images/post/${card.src}`}
            />
            <div className={styles.ToUser}>
              To.
              <input
                type="text"
                value={toValue}
                onChange={handleToInputChange}
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
