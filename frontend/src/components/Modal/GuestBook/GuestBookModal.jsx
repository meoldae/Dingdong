// 스타일
import styles from "./GuestBookModal.module.css"

const GuestBookModal = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. 다영시치</div>
        <div className={styles.ContentContainer}>
          콘텐츠
        </div>
        <div className={styles.FooterContainer}>
          <div className={styles.WriteButton}>
            +
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestBookModal