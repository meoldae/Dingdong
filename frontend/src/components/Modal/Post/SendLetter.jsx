import DefaultBtn from "../../Button/Default/DefaultBtn"
import Card from "../../UI/Card"
import styles from "./SendLetter.module.css"

const SendLetter = () => {
  const cancelClick = () => {
    console.log("취소로직")
  }

  const sendClick = () => {
    console.log("편지전송 로직")
  }
  return (
    <div className={styles.sendLetterContainer}>
      <Card className={styles.sendLetterBox}>
        <div className={styles.xmarkImg} onClick={cancelClick}>
          <img src="assets/icons/Pink_X-mark.png" alt="" />
        </div>
        <img
          className={styles.topPostCardImg}
          src="assets/images/post/postCardDefault.png"
        />
        <div className={styles.letterContent}>
          <h1>textarea로 변경 필요</h1>
        </div>
      </Card>
      <DefaultBtn btnName={"편지 보내기"} onClick={sendClick} />
    </div>
  )
}

export default SendLetter
