import { useEffect, useState } from "react"
import { sendLetter } from "@/api/Letter"
import { userAtom } from "@/atom/UserAtom"
import { roomInfoAtom } from "@/atom/RoomInfoAtom"
import DefaultBtn from "../../Button/Default/DefaultBtn"
import Card from "../../UI/Card"
import styles from "./SendLetter.module.css"
import { useRecoilValue } from "recoil"


const SendLetter = ({ onClose, card }) => {
  const [content, setContent] = useState("");
  const [contentCount, setContentCount] = useState(0);
  const userInfo = useRecoilValue(userAtom);
  const roomInfo = useRecoilValue(roomInfoAtom)

  const url = new URL(window.location.href);
  const roomId = url.pathname.split('/').pop();

  const cancelClick = () => {
    onClose();
  }

  const sendClick = () => {
    const param = {nickName: userInfo.nickname, description: content, stampId: card.idx, roomId: roomId};
    sendLetter(param, response => {
      console.log(response)
      onClose();
    }, (error) => {console.log(error)});    
  }

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleCheckContentCount = (event) => {
    console.log(roomInfo)
    setContent(event.target.value)
    setContentCount(event.target.value.length)
  }
  useEffect(()=>{
    console.log(roomInfo)
  },[roomInfo])
  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.sendLetterContainer}>
        <Card className={styles.sendLetterBox}>
          <div className={styles.xmarkImg} onClick={cancelClick}>
            <img src="/assets/icons/Pink_X-mark.png" alt="" />
          </div>
          <img
            className={styles.topPostCardImg}
            src={`/assets/images/post/${card.src}`}
          />
          <div className={styles.ToUser}>To. {roomInfo}</div>
          <div className={styles.letterContent}>
            <textarea
              value={content}
              onChange={(e) => handleCheckContentCount(e)}
              style={{ fontFamily: "HandWrite-DaHaeng", fontSize: "25px" }}
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
            <div className={styles.FromUser}>From. {userInfo.nickname}</div>
          </div>
        </Card>
        <DefaultBtn btnName={"편지 보내기"} onClick={sendClick} />
      </div>
    </div>
  )
}

export default SendLetter
