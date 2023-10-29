// 라이브러리
import { useState } from "react"

// 스타일
import styles from "./PostPage.module.css"

// 컴포넌트
import PostCardBox from "../../components/Modal/Post/PostCardBox"
import SendLetter from "../../components/Modal/Post/SendLetter"

const PostPage = () => {
  const [searchText, setSearchText] = useState("")
  const [isPostCardBox, setIsPostCardBox] = useState(false)
  const [isPostCard, setIsPostCard] = useState(false)

  const selectedPostCardHandler = () => {
    setIsPostCardBox(false)
    setIsPostCard(true)
  }

  return (
    <div className={styles.Container}>
      <div className={styles.SemiContainer}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>우체국</div>
          <div className={styles.SemiTitle}>편지를 보낼 사람을 찾아보세요.</div>
        </div>
        <div className={styles.TitleLine}></div>
        <div className={styles.ContentContainer}>
          <div className={styles.InputContainer}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="검색"
              maxLength={7}
              className={styles.Input}
            />
            <img
              src={"assets/icons/search.svg"}
              className={styles.SearchIcon}
            />
          </div>
          <div className={styles.ResultContainer}>
            <div>유저 검색 결과</div>
          </div>
        </div>
        <div
          className={styles.SelectButton}
          onClick={() => setIsPostCardBox(true)}
        >
          선택하기
        </div>
      </div>
      {isPostCardBox && (
        <PostCardBox cancelClick={() => setIsPostCardBox(false)} />
      )}
      {isPostCard && <SendLetter />}
    </div>
  )
}

export default PostPage
