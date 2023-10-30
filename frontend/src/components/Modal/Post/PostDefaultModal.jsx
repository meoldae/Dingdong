import Card from "../../UI/Card"
import styles from "./PostDefaultModal.module.css"

const PostDefaultModal = (props) => {
  return (
    <>
      <div className={styles.overlay} onClick={props.cancelClick}></div>
      {props.postCheck ? (
        <Card className={styles.containerOther}>
          <div className={styles.xmarkImg} onClick={props.cancelClick}>
            <img src="/public/assets/icons/Pink_X-mark.png" />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      ) : (
        <Card className={styles.containerMy}>
          <div className={styles.xmarkImg} onClick={props.cancelClick}>
            <img src="/public/assets/icons/Pink_X-mark.png" />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      )}
    </>
  )
}

export default PostDefaultModal
