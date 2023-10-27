import { useState } from "react"
import DefaultBtn from "../../Button/Default/DefaultBtn"
import Card from "../../UI/Card"
import styles from "./SendLetter.module.css"

const SendLetter = ({ onClose, card }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const cancelClick = () => {
    onClose()
    console.log("취소로직")
  }

  const sendClick = () => {
    console.log("편지전송 로직")
  }

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.sendLetterContainer}>
        <Card className={styles.sendLetterBox}>
          <div className={styles.xmarkImg} onClick={cancelClick}>
            <img src="assets/icons/Pink_X-mark.png" alt="" />
          </div>
          <img
            className={styles.topPostCardImg}
            src={`assets/images/post/${card.src}`}
          />
          <div className={styles.titleInputContainer}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={7}
              style={{ fontFamily: "Pretendard-SemiBold" }}
              placeholder="제목 입력"
            />
          </div>
          <div className={styles.letterContent}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ fontFamily: "Pretendard-Regular" }}
              placeholder="편지 내용을 작성하세요."
            />
          </div>
        </Card>
        <DefaultBtn btnName={"편지 보내기"} onClick={sendClick} />
      </div>
    </div>
  )
}

export default SendLetter
