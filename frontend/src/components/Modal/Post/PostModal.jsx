import Card from "../../UI/Card"
import styles from "./PostModal.module.css"

const PostBoxModal = ({ title }) => {
  return (
    <Card className={styles.container}>
      <div className={styles.xmarkImg}>
        <img src="assets/icons/Pink_X-mark.png" />
      </div>

      <div className={styles.containerTitle}>{title}</div>
      <div className={styles.horizontalRule}></div>
    </Card>
  )
}

export default PostBoxModal
