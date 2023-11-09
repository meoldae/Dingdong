// 라이브러리
import { useState } from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"

// Atom
import { userAtom } from "@/atom/UserAtom"
import { finishPostofficeSendLetterAtom, selectedPostCardAtom, postofficeSendLetterAtom } from "../../atom/PostAtom"
import { selectedUserListAtom } from "../../atom/PostOfficeAtom"

// 컴포넌트
import DefaultPostBtn from "../../components/Button/DefaultPost/DefaultPostBtn"
import Card from "../../components/UI/Card"
import { successMsg } from "@/utils/customToast"

// API
import { sendLetterPostOffice } from "../../api/Letter"

// 스타일
import styles from "./PostofficeSendLetter.module.css"

// 기타
// import { v4 as uuidv4 } from "uuid"


const PostofficeSendLetter = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const [content, setContent] = useState("")
  const [contentCount, setContentCount] = useState(0)
  const [toValue, setToValue] = useState("")
  const [fromValue, setFromValue] = useState("")

  const setSelectedPostCardItem = useRecoilValue(selectedPostCardAtom)
  const setSelectedUser = useRecoilValue(selectedUserListAtom)
  const setFinishPostOfficeSendLetter = useSetRecoilState(finishPostofficeSendLetterAtom)
  const setOnPostOfficeSendLetter = useSetRecoilState(postofficeSendLetterAtom)

  const userInfo = useRecoilValue(userAtom)

  // 카카오톡 공유하기
  // const sendClick = () => {
  //   if (!toValue.trim() || !fromValue.trim() || !content.trim()) {
  //     successMsg("❌ 편지를 작성해주세요.")
  //     return
  //   }

  //   const newID = String(uuidv4())
  //   const letterData = {
  //     letterId: newID,
  //     letterTo: toValue,
  //     letterFrom: fromValue,
  //     description: content.replaceAll("<br>","\r\n"),
  //     stampId: card.idx,
  //     roomId: userInfo.roomId,
  //   }

  //   const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY
  //   sendLetterSNS(letterData, (response) => {
  //     if (!window.Kakao.isInitialized()) {
  //       window.Kakao.init(JS_KEY)
  //     }
  //     let currentUrl = window.location.href
  //     const kakaoUrl = currentUrl.endsWith("/")
  //       ? `${currentUrl}letter/${newID}`
  //       : `${currentUrl}/letter/${newID}`
  //     window.Kakao.Share.sendCustom({
  //       templateId: 100120,
  //       templateArgs: {
  //         THU: `https://ding-dong.s3.ap-northeast-2.amazonaws.com/Letter${letterData.stampId}.png`,
  //         TITLE: `딩동! ${letterData.letterFrom}님이 보낸 편지를 확인해보세요.`,
  //         DESC: `From. ${letterData.letterFrom}`,
  //         MOBILE_LINK: kakaoUrl,
  //         WEB_LINK: kakaoUrl,
  //       },
  //     })
  //     setIsFinishSendLetter(false)
  //     setOnPostofficeSendLetter(false)
  //     successMsg("💌 편지를 보냈어요!")
  //   })
  // }

  const sendClick = () => {
    const params = {
      "description": content,
      "stampId": setSelectedPostCardItem.idx,
      "memberIdList": setSelectedUser,
    }
    sendLetterPostOffice(
      params,
      (success) => {
        setOnPostOfficeSendLetter(false)
        successMsg("💌 편지를 보냈습니다!")
      },
      (error) => {
        console.log("Error at Send Letter Post Office...", error)
      }
    )
  }

  // 글자수 체크 함수
  const checkMaxLength = (event) => {
    const inputValue = event.target.value
    if (inputValue.length <= 200) {
      setContent(inputValue)
      setContentCount(inputValue.length)
    }
  }

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.sendLetterContainer} id="sendLetter">
          <div
            className={styles.xmarkImg}
            onClick={() => setFinishPostOfficeSendLetter(true)}
          >
            <img src={`${urlPath}/assets/icons/grayXmark.png`} alt="" />
          </div>
          <Card className={`${styles.sendLetterBox} ${styles[setSelectedPostCardItem.order]}`}>
            <img className={styles.poststampFrame}
              src={`${urlPath}/assets/images/poststamp_frame.png`}
            />
            <img
              className={styles.topPostCardImg}
              src={`${urlPath}/assets/images/post/${setSelectedPostCardItem.src}`}
            />
            <div className={styles.ToUser} style={{ fontFamily: "GangwonEduAll-Light" }}>
              💌딩동!
            </div>
            <div className={styles.letterContent}>
              <textarea
                value={content}
                onChange={(e) => checkMaxLength(e)}
                placeholder="편지 내용을 작성하세요."
                maxLength={200}
                spellCheck="false"
                style={{ fontFamily: "GangwonEduAll-Light" }}
              />
            </div>
            <div className={styles.contentCount} style={{ fontFamily: "GangwonEduAll-Light" }}>{contentCount}/200</div>
            <div className={styles.footerContainer} style={{ fontFamily: "GangwonEduAll-Light" }}>
              <div className={styles.FromUser}>
                From. {userInfo.nickname}
              </div>
            </div>
          </Card>
          <DefaultPostBtn
            btnName={"편지 보내기"}
            onClick={sendClick}
            color={setSelectedPostCardItem.order}
          />
        </div>
      </div>
    </>
  )
}

export default PostofficeSendLetter
