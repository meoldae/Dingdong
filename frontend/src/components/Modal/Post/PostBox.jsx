import Letter from "../../PostBox/Letter"
import styles from "./PostBox.module.css"
import PostDefaultModal from "./PostDefaultModal"

const PostBox = () => {
  return (
    <PostDefaultModal
      PostDefaultTitle={"편지함"}
      className={styles.postBoxContainer}
    >
      <div className={styles.lettersBox}>
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
      </div>
    </PostDefaultModal>
  )
}

export default PostBox
