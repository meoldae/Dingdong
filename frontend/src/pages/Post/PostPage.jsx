import styles from "./PostPage.module.css"

const PostPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.SemiContainer}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>우체국</div>
          <div>편지를 보낼 사람을 찾아보세요.</div>
        </div>
        <div className={styles.ContentContainer}>
          <div>내용</div>
        </div>
      </div>
    </div>
  )
}

export default PostPage
