import Card from "../../UI/Card"
import styles from "./ReceiveLetter.module.css"
import { letterIdAtom } from "@/atom/LetterAtom"
import { useRecoilValue } from "recoil"
import { useState, useEffect } from "react"
import { getLetterDetail } from "@/api/Letter"
import { successMsg } from "../../../utils/customToast"
import { reportLetter } from "../../../api/Letter"

const RecevieLetter = (props) => {
  const letterId = useRecoilValue(letterIdAtom)
  const [letterDetail, setLetterDetail] = useState(null)
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
        {letterDetail ? (
          <div className={styles.receiveLetterContainer}>
            <Card className={styles.receiveLetterBox}>
              <div className={styles.xmarkImg} onClick={props.cancelClick}>
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
                <div className={styles.report} onClick={reportHandler}>
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
    </>
  )
}

export default RecevieLetter
