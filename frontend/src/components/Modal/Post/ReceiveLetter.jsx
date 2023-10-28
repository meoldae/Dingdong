import Card from "../../UI/Card"
import styles from "./ReceiveLetter.module.css"

const RecevieLetter = () => {
  const cancelClick = () => {
    console.log("취소로직")
  }

  return (
    <Card className={styles.recevieLetterContainer}>
      <div className={styles.xmarkImg} onClick={cancelClick}>
        <img src="assets/icons/Pink_X-mark.png" alt="" />
      </div>

      <img
        className={styles.topPostCardImg}
        src="assets/images/post/postCardDefault.png"
      />
      <div className={styles.letterContent}>
        <h1>안녕 난 장호야</h1>
      </div>
      <div className={styles.sendUserName}>
        <h3>From.호~~~~!</h3>
      </div>
    </Card>
  )
}

export default RecevieLetter
