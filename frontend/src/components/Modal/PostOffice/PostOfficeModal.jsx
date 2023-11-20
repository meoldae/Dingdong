// 라이브러리
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"

// API
import { fetchSerchNickname } from "../../../api/User"

// 스타일
import styles from "./PostOfficeModal.module.css"

// Atom
import {
  selectedUserListAtom,
  isPostOfficeVisibleAtom,
  selectedUserNicknameListAtom
} from "../../../atom/PostOfficeAtom"
import { postofficeCardAtom } from "../../../atom/PostAtom"

// 컴포넌트
import { successMsg } from "../../../utils/customToast"

const PostOfficeModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 닉네임 검색 상태관리
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [memberIdList, setMemberIdList] = useRecoilState(selectedUserListAtom)
  const [memberNicknameList, setMemberNicknameList] = useRecoilState(selectedUserNicknameListAtom)
  const setPostOfficeCard = useSetRecoilState(postofficeCardAtom)
  const setIsPostOfficeVisible = useSetRecoilState(isPostOfficeVisibleAtom)
  
  // 선택 완료 이전 임시 상태 저장
  const [tempMemberList, setTempMemberList] = useState([])

  // 닉네임 검색 함수
  const searchNicknameHandler = (event) => {
    const newText = event.target.value
    setSearchText(newText)
    if (newText.length !== 0) {
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
  }

  // memberId & nickname 토글 함수
  const toggleMemberIdHandler = (memberId, nickname) => {
    setTempMemberList(prev => {
      if (prev.some(member => member.memberId === memberId)) {
        return prev.filter(prevMember => prevMember.memberId !== memberId);
      } else {
        return [...prev, { memberId, nickname }];
      }
    })
  }

  // 검색 결과 아이템
  const SearchResultItem = ({ avatarId, nickname, memberId }) => {
    return (
      <div className={styles.ItemContainer} onClick={() => toggleMemberIdHandler(memberId, nickname)}>
        <div className={styles.ItemAvatar}>
          <img src={`${urlPath}/assets/icons/${avatarId}_crop.png`} />
        </div>
        <div className={styles.Nickname} style={{ fontFamily: "GmarketSansMedium", height: "15px"}}>{nickname}</div>
        <div className={styles.CheckButton} >
          {tempMemberList.some(item => item.memberId === memberId && item.nickname === nickname) ? (
            <img src={`${urlPath}/assets/icons/postOffice_check.png`} />
          ) : (
            <img src={`${urlPath}/assets/icons/postOffice_plus.png`} />
          )}
          
        </div>
      </div>
    )
  }

  // 선택완료 버튼 함수
  const finishCheckUser = () => {
    if (tempMemberList.length === 0) {
      successMsg("❌ 선택된 유저가 없습니다.")
    } else {
      const tempMemberIdList = tempMemberList.map(item => item.memberId);
      const tempMemberNicknameList = tempMemberList.map(item => item.nickname);
      setMemberIdList(tempMemberIdList)
      setMemberNicknameList(tempMemberNicknameList)
      setIsPostOfficeVisible(false)
      setPostOfficeCard(true)
    }
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
              placeholder="닉네임 검색"
              onChange={(e) => searchNicknameHandler(e)}
            />
          </div>
          <div
            className={styles.Cancel}
            style={{ fontFamily: "GmarketSansMedium", height: "10px" }}
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
        <div className={styles.CheckedUserContainer}>
          {tempMemberList.length === 0 ? (
            <></>
          ) : (
              tempMemberList.map((item, index) => (
                <div key={index} className={styles.checkedUserNickname} onClick={() => toggleMemberIdHandler(item.memberId, item.nickname)} >
                  {item.nickname} &nbsp;×
                </div>
              ))
          )}
        </div>
        <div
          className={styles.Button}
          style={{ fontFamily: "GmarketSansMedium" }}
          onClick={() => finishCheckUser()}
        >
          <div style={{height: "20px"}}>선택완료</div>
        </div>
      </div>
    </>
  )
}

export default PostOfficeModal