// 라이브러리
import { useRecoilState } from "recoil"

// Atom
import { isGuestBookVisibleAtom }  from "../../../atom/GuestBookAtom"

// 스타일
import styles from "./GuestBookModal.module.css"

const GuestBookModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 리코일 상태관리
  const [isGuestBookVisible, setIsGuestBookVisible] = useRecoilState(isGuestBookVisibleAtom)

  // 색상 아이템
  const colorList = [
    "linear-gradient(180deg, #FFFFFF 0%, #FF6E8A 100%)", // 0: 빨간색
    "linear-gradient(180deg, #FFFFFF 0%, #FF9E2C 100%)", // 1: 주황색
    "linear-gradient(180deg, #FFFFFF 0%, #FFC745 100%)", // 2: 노란색
    "linear-gradient(180deg, #FFFFFF 0%, #27D674 100%)", // 3: 초록색
    "linear-gradient(180deg, #FFFFFF 0%, #64B1FF 100%)", // 4: 파란색
    "linear-gradient(180deg, #FFFFFF 0%, #CB9DFF 100%)", // 5: 보라색
    "linear-gradient(180deg, #FFFFFF 0%, #696969 100%)", // 6: 검정색
  ]

  // 콘텐츠 아이템
  const ContentItem = ({ content, rotate, colorNum }) => {
    return (
      <div className={styles.Item}>
        <div className={styles.Content} style={{ transform: `rotate(${rotate}deg)`, background: `${colorList[colorNum]}` }}>
          <div className={styles.temp}>
            {content}
          </div>
        </div>
      </div>
    )
  }

  // 방명록 작성 상태관리
  const isWriteGuestBookHandler = () => {
    setIsGuestBookVisible(false)
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. 다영시치</div>
        <div className={styles.ContentContainer}>
          <ContentItem
            content={"이건 테스트를 위한 더미 내용입니다. 진짜 신기하죠? 우와오아와와와와!"}
            rotate={5}
            colorNum={0}
          />
        </div>
        <div className={styles.FooterContainer}>
          <div className={styles.WriteButton} onClick={() => isWriteGuestBookHandler()}>
            <img src={`${urlPath}/assets/icons/writeGuestBook.png`} style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestBookModal