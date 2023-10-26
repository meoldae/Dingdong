import { useState } from 'react';
import DefaultBtn from "../../Button/Default/DefaultBtn"
import Card from "../../UI/Card"
import styles from "./SendLetter.module.css"

const SendLetter = ({ onClose, card }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const cancelClick = () => {
    console.log("취소로직")
  }

  const sendClick = () => {
    console.log("편지전송 로직")
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.sendLetterContainer}>
        <Card className={styles.sendLetterBox}>
          <div className={styles.xmarkImg} onClick={cancelClick}>
            <img src="assets/icons/Pink_X-mark.png" alt="" />
          </div>
          <img className={styles.topPostCardImg} src={`assets/images/post/${card.src}`}
          />
          <div className={styles.titleInputContainer}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={7} placeholder="제목 입력"
            />
          </div>
          <div className={styles.letterContent}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="편지 내용을 작성하세요."
            />
          </div>
        </Card>
        <DefaultBtn btnName={"편지 보내기"} onClick={sendClick} />
      </div>
    </div>
  )
}

export default SendLetter
