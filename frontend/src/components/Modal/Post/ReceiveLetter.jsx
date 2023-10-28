import Card from "../../UI/Card"
import styles from "./ReceiveLetter.module.css"

const RecevieLetter = (props) => {
  return (
    <div className={styles.overlay} onClick={props.cancelClick}>
      <Card
        className={styles.recevieLetterContainer}
        cancelClick={props.cancelClick}
      >
        <div className={styles.xmarkImg} onClick={props.cancelClick}>
          <img src="assets/icons/Pink_X-mark.png" alt="" />
        </div>
        <img
          className={styles.topPostCardImg}
          src="assets/images/post/postCardDefault.png"
        />
        <div className={styles.letterContent}>
          <h1>안녕 난 장호야</h1>
        </div>
        <div>
          <span>편지 내용입니다.</span>
        </div>
        <div className={styles.sendUserName}>
          <h3>From.호~~~~!</h3>
        </div>
      </Card>
    </div>
  )
}

export default RecevieLetter
