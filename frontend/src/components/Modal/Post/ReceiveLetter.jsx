import Card from "../../UI/Card"
import styles from "./ReceiveLetter.module.css"

const RecevieLetter = (props) => {
  const reportHandler = () => {
    console.log("신고하기 함수")
  }

  return (
    <div className={styles.overlay} onClick={props.cancelClick}>
      <div className={styles.receiveLetterContainer}>
        <Card className={styles.receiveLetterBox}>
          <div className={styles.xmarkImg} onClick={props.cancelClick}>
            <img src="assets/icons/Pink_X-mark.png" alt="" />
          </div>
          <img
            className={styles.topPostCardImg}
            src="assets/images/post/postCardDefault.png"
          />
          <div className={styles.letterToUser}>To. 장호</div>
          <div className={styles.letterContent}>
            <span>편지 내용입니다.</span>
          </div>
          <div className={styles.footerContainer}>
            <div className={styles.report} onClick={reportHandler}>
              신고하기
            </div>
            <div className={styles.FromUser}>From.호~~~~!</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default RecevieLetter
