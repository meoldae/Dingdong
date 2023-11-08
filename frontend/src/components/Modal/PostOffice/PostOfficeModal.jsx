// 스타일
import styles from "./PostOfficeModal.module.css"

const PostOfficeModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title} style={{ fontFamily: "GmarketSansMedium" }}>우체국</div>
        <div className={styles.Line} />
        <div className={styles.SearchContainer}>
          <div className={styles.Search}>
            <img src={`${urlPath}/assets/icons/search.png`} />
          </div>
          <div className={styles.Cancel} style={{ fontFamily: "GmarketSansMedium" }}>취소</div>
        </div>
      </div>
    </>
  )
}

export default PostOfficeModal