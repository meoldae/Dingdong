import DefaultBtn from "../../Button/Default/DefaultBtn"
import styles from "./PostCardBox.module.css"
import PostDefaultModal from "./PostDefaultModal"

const PostCardBox = () => {
  return (
    <PostDefaultModal PostDefaultTitle={"우표"}>
      <div className={styles.postCardContainer}>
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
        <img
          className={styles.postCard}
          src="assets/images/post/postCardDefault.png"
        />
      </div>
      <div className={styles.postCardComment}>
        하트 우표로 사랑을 전달해보세요!
      </div>
      <div className={styles.selectBtn}>
        <DefaultBtn btnName={"선택하기"} />
      </div>
    </PostDefaultModal>
  )
}

export default PostCardBox
