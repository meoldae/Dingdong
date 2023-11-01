// 스타일
import styles from "./RankingModal.module.css"

const RankingModal = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>랭킹</div>
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.Content}>Content</div>
        </div>
        <div className={styles.FooterContainer}>
          <div className={styles.Footer}>Footer</div>
        </div>
      </div>
    </>
  )
}

export default RankingModal