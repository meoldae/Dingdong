import { useState } from "react"
import { sendLetter, sendGuestLetter } from "@/api/Letter"
import { userAtom } from "@/atom/UserAtom"
import { roomInfoAtom } from "@/atom/RoomInfoAtom"
import DefaultPostBtn from "../../Button/DefaultPost/DefaultPostBtn"
import Card from "../../UI/Card"
import styles from "./SendLetter.module.css"
import { useRecoilValue } from "recoil"
import { successMsg } from "@/utils/customToast"
import DefaultModal from "../Default/DefaultModal"

const SendLetter = ({ onClose, card }) => {
  const [content, setContent] = useState("")
  const [contentCount, setContentCount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [isFinishSendLetter, setIsFinishSendLetter] = useState(false)

  const userInfo = useRecoilValue(userAtom)
  const [userNickname, setUserNickname] = useState(userInfo.nickname || "")

  const roomInfo = useRecoilValue(roomInfoAtom)

  const url = new URL(window.location.href)
  const roomId = url.pathname.split("/").pop()

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const cancelClick = () => {
    onClose()
    setIsFinishSendLetter(false)
  }

  const sendClick = () => {
    if (isSending) return

    if (!userNickname.trim() || !content.trim()) {
      successMsg("❌ 편지를 작성해주세요.")
      return
    }

    setIsSending(true)

    const param = {
      nickName: userNickname,
      description: content.replaceAll("<br>","\r\n"),
      stampId: card.idx,
      roomId: roomId,
    }

    if (!userInfo.accessToken) {
      sendGuestLetter(
        param,
        (response) => {
          successMsg("💌 편지를 보냈어요!")
          onClose()
          setIsSending(false)
        },
        (error) => {
          console.log(error)
        }
      )
    } else {

      sendLetter(
        param,
        (response) => {
          successMsg("💌 편지를 보냈어요!")
          onClose()
          setIsSending(false)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsFinishSendLetter(true)
    }
  }

  // 편지 작성 글자수 체크함수
  const checkMaxLength = (event, checker) => {
    const inputValue = event.target.value

    if (checker === "content" && inputValue.length <= 200) {
      setContent(event.target.value)
      setContentCount(event.target.value.length)
    }

    if (checker === "nickname" && inputValue.length <= 5) {
      setUserNickname(event.target.value)
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={handleOutsideClick}>
        <div className={styles.sendLetterContainer}>
          <div className={styles.xmarkImg} onClick={() => setIsFinishSendLetter(true)}>
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
            <div className={styles.ToUser} style={{ fontFamily: "GangwonEduAll-Light" }}>To. {roomInfo}</div>
            <div className={styles.letterContent}>
              <textarea
                value={content}
                onChange={(e) => checkMaxLength(e, "content")}
                placeholder="편지 내용을 작성하세요."
                maxLength={200}
                spellCheck="false"
                style={{ fontFamily: "GangwonEduAll-Light"}}
              />
            </div>
            <div className={styles.contentCount} style={{ fontFamily: "GangwonEduAll-Light" }}>{contentCount}/200</div>
            <div className={styles.footerContainer} style={{ fontFamily: "GangwonEduAll-Light" }}>
              {/* <div className={styles.anonymous}>
                <span>체크박스</span>
                <span>익명의 이웃</span>
              </div> */}
              <div className={styles.FromUser}>
                From.
                {userInfo.nickname ? (
                  userInfo.nickname
                ) : (
                  <textarea
                    value={userNickname}
                    onChange={(e) => checkMaxLength(e, "nickname")}
                    placeholder="닉네임을 입력하세요."
                    maxLength={5}
                    style={{ fontFamily: "GangwonEduAll-Light" }}
                  />
                )}
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
          <div className={styles.finishOverlay} onClick={() => setIsFinishSendLetter(false)}>
            <div className={styles.finishContainer}>
              <DefaultModal
                content={"편지 작성을 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={cancelClick}
                cancelClick={() => setIsFinishSendLetter(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SendLetter
