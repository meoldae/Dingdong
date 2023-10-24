import { useEffect } from "react"
import Letter from "../../PostBox/Letter"
import styles from "./PostBox.module.css"
import PostDefaultModal from "./PostDefaultModal"

const PostBox = () => {
  return (
    <PostDefaultModal
      className={styles.postBoxContainer}
      PostDefaultTitle={"편지함"}
    >
      <div className={styles.letterBox}>
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
        <Letter letterTitle={"제목"} />
      </div>
    </PostDefaultModal>
  )
}

export default PostBox
