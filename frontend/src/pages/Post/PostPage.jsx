// 라이브러리
import { useState } from "react"

// 스타일
import styles from "./PostPage.module.css"

const PostPage = () => {
  const [searchText, setSearchText] = useState("")

  return (
    <div className={styles.Container}>
      <div className={styles.SemiContainer}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>우체국</div>
          <div className={styles.SemiTitle}>편지를 보낼 사람을 찾아보세요.</div>
        </div>
        <div className={styles.TitleLine}></div>
        <div className={styles.ContentContainer}>
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default PostPage
