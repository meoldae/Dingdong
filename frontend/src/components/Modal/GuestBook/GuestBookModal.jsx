// 스타일
import styles from "./GuestBookModal.module.css"

const GuestBookModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 콘텐츠 아이템
  const ContentItem = ({ content }) => {
    return (
      <div className={styles.Item}>
        <div className={styles.Content}>
          <div className={styles.temp}>
            {content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. 다영시치</div>
        <div className={styles.ContentContainer}>
          <ContentItem content={"이건 테스트를 위한 더미 내용입니다. 진짜 신기하죠? 우와오아와와와와!"} />
        </div>
        <div className={styles.FooterContainer}>
          <div className={styles.WriteButton}>
            <img src={`${urlPath}/assets/icons/writeGuestBook.png`} style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestBookModal