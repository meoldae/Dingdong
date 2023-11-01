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
  // 신고하기 확인 모달 상태관리
  const [isReport, setIsReport] = useState(false)

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
        successMsg("🚫 신고하기 완료!")
      },
      (error) => {
        'Error at reportLetter...', error
      }
    )
  }

  return (
    <>
      <div className={styles.overlay} onClick={props.cancelClick}>
        {letterDetail && (
          <div className={styles.receiveLetterContainer}>
            <Card className={styles.receiveLetterBox}>
              <div className={styles.xmarkImg} onClick={props.cancelClick}>
                <img src="/assets/icons/Pink_X-mark.png" alt="" />
              </div>
              <img
                className={styles.topPostCardImg}
                src={`/assets/images/post/${letterDetail?.stampImgUrl
                  .split("/")
                  .pop()}`}
              />
              <div className={styles.letterToUser}>
                To. {letterDetail?.letterTo}
              </div>
              <div className={styles.letterContent}>
                <span>{letterDetail?.description}</span>
              </div>
              <div className={styles.footerContainer}>
                <div className={styles.report} onClick={() => setIsReport(true)}>
                  신고하기
                </div>
                <div className={styles.FromUser}>
                  From. {letterDetail?.letterFrom}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* 신고하기 확인 모달 */}
      {isReport && (
        <>
          <div className={styles.reportOverlay} onClick={() => setIsReport(false)}/>
          <div className={styles.reportScreen}>
            <div className={styles.reportModal}>
              <DefaultModal
                content={"신고를 하시겠습니까?"}
                ok={"네"}
                cancel={"아니오"}
                okClick={reportHandler}
                cancelClick={() => setIsReport(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RecevieLetter
