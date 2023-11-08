// 라이브러리
import { useRecoilValue } from "recoil"
import { useState, useEffect } from "react"

// 컴포넌트
import Card from "../../UI/Card"
import { successMsg } from "../../../utils/customToast"
import DefaultModal from "../Default/DefaultModal"

// 스타일
import styles from "./ReceiveLetter.module.css"

// Atom
import { letterIdAtom } from "@/atom/LetterAtom"

// API
import { getLetterDetail, reportLetter } from "@/api/Letter"


const RecevieLetter = (props) => {
  // 선택한 편지 ID
  const letterId = useRecoilValue(letterIdAtom)

  // 편지 디테일 정보 상태관리
  const [letterDetail, setLetterDetail] = useState(null)
  // 신고하기 모달 상태관리
  const [isReport, setIsReport] = useState(false)
  const [letterStamp, setLetterStamp] = useState(null);

  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  
  // 편지 상세 정보를 가져오는 함수
  useEffect(() => {
    const fetchLetterDetail = async () => {
      try {
        await getLetterDetail(letterId, (response) => {
          if (response.data.code === "SUCCESS") {
            setLetterDetail(response.data.data)
            setLetterStamp(response.data.data.stampImgUrl.split("/").pop().split('.')[0])
          }
        })
      } catch (error) {
        console.error("Error fetching letter details:", error)
      }
    }
    fetchLetterDetail()
  }, [])

  // 신고하기 함수
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
            {/* <div className={styles.xmarkImg} onClick={() => setIsFinishReceiveLetter(true)}>
              <img src={`${urlPath}/assets/icons/grayXmark.png`} alt="" />
            </div> */}
            <Card className={`${styles.receiveLetterBox} ${styles[letterStamp]}`}>
              <img className={styles.poststampFrame}
                  src={`${urlPath}/assets/images/poststamp_frame.png`}
              />  
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
              <span style={{ whiteSpace: 'normal', wordWrap: 'break-word', width: '310px' }} dangerouslySetInnerHTML={{ __html: letterDetail?.description.replaceAll('\n', '<br />') }} />
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