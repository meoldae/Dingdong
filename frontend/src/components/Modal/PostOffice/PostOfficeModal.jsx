// 라이브러리
import { useState } from "react"

// API
import { fetchSerchNickname } from "../../../api/User"

// 스타일
import styles from "./PostOfficeModal.module.css"

const PostOfficeModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 닉네임 검색 상태관리
  const [searchText, setSearchText] = useState("")

  // 닉네임 검색 함수
  const searchNicknameHandler = (event) => {
    const newText = event.target.value
    setSearchText(newText)

    fetchSerchNickname(
      newText,
      (success) => {
        console.log(success)
      },
      (error) => {
        console.log("Error at Search Nickname...", error)
      }
    )
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title} style={{ fontFamily: "GmarketSansMedium" }}>우체국</div>
        <div className={styles.Line} />
        <div className={styles.SearchContainer}>
          <div className={styles.Search}>
            <img src={`${urlPath}/assets/icons/search.png`} />
            <input
              type="text"
              value={searchText}
              placeholder="검색"
              onChange={(e) => searchNicknameHandler(e)}
            />
          </div>
          <div className={styles.Cancel} style={{ fontFamily: "GmarketSansMedium" }}>취소</div>
        </div>
      </div>
    </>
  )
}

export default PostOfficeModal