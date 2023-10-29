import styles from "./PostPage.module.css"

const PostPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.TitleContainer}>
        <div>주민 찾기</div>
      </div>
      <div className={styles.ContentContainer}>
        <div>내용</div>
      </div>
    </div>
  )
}

export default PostPage
