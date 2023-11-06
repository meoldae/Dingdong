import { useState } from "react"
import { userAtom } from "@/atom/UserAtom"
import DefaultPostBtn from "../../components/Button/DefaultPost/DefaultPostBtn"
import Card from "../../components/UI/Card"
import styles from "./PostofficeSendLetter.module.css"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { postofficeSendLetterAtom } from "../../atom/PostAtom"
import { sendLetterSNS } from "../../api/Letter"
import { v4 as uuidv4 } from "uuid"
import { successMsg } from "@/utils/customToast"

const PostofficeSendLetter = ({ card }) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const [content, setContent] = useState("")
  const [contentCount, setContentCount] = useState(0)
  const [toValue, setToValue] = useState("")
  const [fromValue, setFromValue] = useState("")
  const [isFinishSendLetter, setIsFinishSendLetter] = useState(false)

  const setOnPostofficeSendLetter = useSetRecoilState(postofficeSendLetterAtom)

  const userInfo = useRecoilValue(userAtom)

  const sendClick = () => {
    if (!toValue.trim() || !fromValue.trim() || !content.trim()) {
      successMsg("❌ 편지를 작성해주세요.")
      return
    }

    const newID = String(uuidv4())
    const letterData = {
      letterId: newID,
      letterTo: toValue,
      letterFrom: fromValue,
      description: content.replaceAll("<br>","\r\n"),
      stampId: card.idx,
      roomId: userInfo.roomId,
    }

    const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY
    sendLetterSNS(letterData, (response) => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(JS_KEY)
      }
      let currentUrl = window.location.href
      const kakaoUrl = currentUrl.endsWith("/")
        ? `${currentUrl}letter/${newID}`
        : `${currentUrl}/letter/${newID}`
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          THU: "https://ding-dong.s3.ap-northeast-2.amazonaws.com/StampLogo.png",
          TITLE: `딩동! ${letterData.letterFrom}님이 보낸 편지를 확인해보세요.`,
          DESC: `From. ${letterData.letterFrom}`,
          MOBILE_LINK: kakaoUrl,
          WEB_LINK: kakaoUrl,
        },
      })
      setIsFinishSendLetter(false)
      setOnPostofficeSendLetter(false)
      successMsg("💌 편지를 보냈어요!")
    })
  }

  const handleCheckContentCount = (event) => {
    setContent(event.target.value)
    setContentCount(event.target.value.length)
  }
  const handleToInputChange = (event) => {
    setToValue(event.target.value)
  }
  const handleFromInputChange = (event) => {
    setFromValue(event.target.value)
  }

  return (
    <>
      <div
        className={styles.overlays}
        onClick={() => {
          setOnPostofficeSendLetter(false)
        }}
      />
      <div className={styles.overlay}>
        <div className={styles.sendLetterContainer} id="sendLetter">
          <div
            className={styles.xmarkImg}
            onClick={() => {
              setOnPostofficeSendLetter(false)
            }}
          >
            <img src={`${urlPath}/assets/icons/grayXmark.png`} alt="" />
          </div>
          <Card className={`${styles.sendLetterBox} ${styles[card.order]}`}>
            <img className={styles.poststampFrame}
              src={`${urlPath}/assets/images/poststamp_frame.png`}
            />
            <img
              className={styles.topPostCardImg}
              src={`${urlPath}/assets/images/post/${card.src}`}
            />
            <div className={styles.ToUser}>
              To.
              <input
                type="text"
                value={toValue}
                onChange={handleToInputChange}
                placeholder="입력하세요."
                maxLength="7"
              />
            </div>
            <div className={styles.letterContent}>
              <textarea
                value={content}
                onChange={(e) => handleCheckContentCount(e)}
                placeholder="편지 내용을 작성하세요."
                maxLength={199}
                spellCheck="false"
              />
            </div>
            <div className={styles.contentCount}>{contentCount}/200</div>
            <div className={styles.footerContainer}>
              <div className={styles.FromUser}>
                From.
                <input
                  type="text"
                  value={fromValue}
                  placeholder="입력하세요."
                  onChange={handleFromInputChange}
                  maxLength="7"
                />
              </div>
            </div>
          </Card>
          <DefaultPostBtn
            btnName={"편지 보내기"}
            onClick={sendClick}
            color={card.order}
          />
        </div>
      </div>

      {/* 편지보내기 종료모달 */}
      {isFinishSendLetter && (
        <>
          <div />
          <div>

          </div>
        </>
      )}
    </>
  )
}

export default PostofficeSendLetter
