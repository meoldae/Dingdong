// 라이브러리
import { useState } from "react"
import { useRecoilState } from "recoil"

// API
import { fetchSerchNickname } from "../../../api/User"

// 스타일
import styles from "./PostOfficeModal.module.css"

// Atom
import { selectedUserListAtom } from "../../../atom/PostOfficeAtom"

const PostOfficeModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 닉네임 검색 상태관리
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [memberIdList, setMemberIdList] = useRecoilState(selectedUserListAtom)

  // 닉네임 검색 함수
  const searchNicknameHandler = (event) => {
    const newText = event.target.value
    setSearchText(newText)

    fetchSerchNickname(
      newText,
      (success) => {
        setSearchResult(success.data.data)
      },
      (error) => {
        // console.log("Error at Search Nickname...", error)
      }
    )
  }

  // memberId 토글 함수
  const toggleMemberIdHandler = (memberId) => {
    setMemberIdList(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId)
      } else {
        return [...prev, memberId]
      }
    })
  }

  // 검색 결과 아이템
  const SearchResultItem = ({ avatarId, nickname, memberId }) => {
    return (
      <div className={styles.ItemContainer}>
        <div className={styles.ItemAvatar}>
          <img src={`${urlPath}/assets/icons/${avatarId}_crop.png`} />
        </div>
        <div className={styles.Nickname} style={{ fontFamily: "GmarketSansMedium" }}>{nickname}</div>
        <div className={styles.CheckButton} onClick={() => toggleMemberIdHandler(memberId)}>
          {memberIdList.includes(memberId) ? (
            <img src={`${urlPath}/assets/icons/postOffice_check.png`} />
          ) : (
            <img src={`${urlPath}/assets/icons/postOffice_plus.png`} />
          )}
          
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
                <SearchResultItem
                  avatarId={item.avatarId}
                  nickname={item.nickname} 
                  memberId={item.memberId}
                />
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