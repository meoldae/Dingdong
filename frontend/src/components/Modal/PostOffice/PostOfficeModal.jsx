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
  const [searchResult, setSearchResult] = useState([])

  // 닉네임 검색 함수
  const searchNicknameHandler = (event) => {
    const newText = event.target.value
    setSearchText(newText)

    fetchSerchNickname(
      newText,
      (success) => {
        console.log(success.data.data)
        setSearchResult(success.data.data)
      },
      (error) => {
        console.log("Error at Search Nickname...", error)
      }
    )
  }

  // 검색 결과 아이템
  const SearchResultItem = ({ avatarId, nickname }) => {
    return (
      <div className={styles.ItemContainer}>
        <div className={styles.ItemAvatar}>
          <img src={`${urlPath}/assets/icons/${avatarId}_crop.png`} />
        </div>
        <div className={styles.Nickname} style={{ fontFamily: "GmarketSansMedium" }}>{nickname}</div>
        <div className={styles.CheckButton}>
          <img src={`${urlPath}/assets/icons/postOffice_plus.png`} />
        </div>
      </div>
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
          <div
            className={styles.Cancel}
            style={{ fontFamily: "GmarketSansMedium" }}
            onClick={() => setSearchText("")}
          >
            취소
          </div>
        </div>
        <div className={styles.ContentContainer}>
          {searchResult.length === 0 ? (
            <div style={{ width: "240px", textAlign: "center", fontSize: "12px" }}>검색 결과가 없습니다.</div>
          ) : (
            searchResult.map((item) => (
              <div key={item.memberId}>
                <SearchResultItem avatarId={item.avatarId} nickname={item.nickname} />
              </div>
            ))
          )}
        </div>
        <div className={styles.Button} style={{ fontFamily: "GmarketSansMedium" }}>선택완료</div>
      </div>
    </>
  )
}

export default PostOfficeModal