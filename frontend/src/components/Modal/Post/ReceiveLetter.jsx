import Card from "../../UI/Card"
import styles from "./ReceiveLetter.module.css"
import { letterIdAtom } from "@/atom/LetterAtom"
import { useRecoilValue } from "recoil"
import { useState, useEffect } from "react"
import { getLetterDetail } from "@/api/Letter"
import { successMsg } from "../../../utils/customToast"
import { reportLetter } from "../../../api/Letter"
import DefaultModal from "../Default/DefaultModal"

const RecevieLetter = (props) => {
  const letterId = useRecoilValue(letterIdAtom)

  const [letterDetail, setLetterDetail] = useState(null)
  // 편지함 종료모달 상태관리
  const [isFinishReceiveLetter, setIsFinishReceiveLetter] = useState(false)
  // 신고하기 모달 상태관리
  const [isReport, setIsReport] = useState(false)

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  useEffect(() => {
    const fetchLetterDetail = async () => {
      try {
        getLetterDetail(letterId, (response) => {
          if (response.data.code === "SUCCESS") {
            setLetterDetail(response.data.data)
          }
        })
      } catch (error) {
        console.error("Error fetching letter details:", error)
      }
    }

    fetchLetterDetail()
  }, [])

  const reportHandler = () => {
    reportLetter(
      letterId,
      (success) => {
        props.cancelClick()
        setIsFinishReceiveLetter(false)
        successMsg("🚫 신고하기 완료!")
      },
      (error) => {
        'Error at reportLetter...', error
      }
    )
  }

  // 신고하기 모달종료 함수
  const repostFinishHandler = () => {
    setIsReport(false)
    setIsFinishReceiveLetter(false)
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsFinishReceiveLetter(true)}>
        {letterDetail ? (
          <div className={styles.receiveLetterContainer}>
            <Card className={styles.receiveLetterBox}>
              <div className={styles.xmarkImg} onClick={() => setIsFinishReceiveLetter(true)}>
                <img src={`${urlPath}/assets/icons/Pink_X-mark.png`} alt="" />
              </div>
              <img
                className={styles.topPostCardImg}
                src={`${urlPath}/assets/images/post/${letterDetail?.stampImgUrl
                  .split("/")
                  .pop()}`}
              />
              <div className={styles.letterToUser} style={{ fontFamily: "GangwonEduAll-Light" }}>
                To. {letterDetail?.letterTo}
              </div>
              <div className={styles.letterContent} style={{ fontFamily: "GangwonEduAll-Light" }}>
              <span dangerouslySetInnerHTML={{ __html: letterDetail?.description.replaceAll('\n', '<br />') }} />
              </div>
              <div className={styles.footerContainer} style={{ fontFamily: "GangwonEduAll-Light" }}>
                <div className={styles.report} onClick={() => setIsReport(true)}>
                  신고하기
                </div>
                <div className={styles.FromUser}>
                  From. {letterDetail?.letterFrom}
                </div>
              </div>
            </Card>
          </div>
        ):(
          <div>
            편지가 없습니다.
          </div>
        )
        }
      </div>

      {/* 받은편지 종료모달 */}
      {isFinishReceiveLetter && (
        <>
          <div className={styles.finishOverlay} onClick={() => setIsFinishReceiveLetter(false)}>
            <div className={styles.finishContainer}>
              <DefaultModal
                content={"편지를 종료하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => props.cancelClick()}
                cancelClick={() => setIsFinishReceiveLetter(false)}
              />
            </div>
          </div>
        </>
      )}

      {/* 신고하기 모달 */}
      {isReport && (
        <>
          <div className={styles.finishOverlay} onClick={() => repostFinishHandler()}>
            <div className={styles.finishContainer}>
              <DefaultModal
                content={"신고하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={() => reportHandler()}
                cancelClick={() => repostFinishHandler()}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RecevieLetter
