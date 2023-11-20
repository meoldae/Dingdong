import styles from "./RankingInformation.module.css"

const RankingInformation = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.SemiContainer}>
          <div className={styles.Title}>순위권 🍯꿀팁!</div>
          <div className={styles.ContentContainer}>
            <div className={styles.LikeContainer}>
              <div className={styles.SemiTitle}>방꾸왕👑 달성하는 꿀팁</div>
              <div className={styles.DivisionLine} />
              <div className={styles.Content}>
                방을 예쁘게 꾸미는 것이 가장 중요합니다! <br/>좋아요를 많이 받은 방은 방꾸왕이 됩니다!
              </div>
            </div>
            <div className={styles.LikeContainer}>
              <div className={styles.SemiTitle}>인기왕👑 달성하는 꿀팁</div>
              <div className={styles.DivisionLine} />
              <div className={styles.Content}>
                최대한 많은 사람들에게 편지를 받으세요! <br/>편지를 많이 받으면 인기왕이 됩니다!
              </div>
            </div>
            <div className={styles.LikeContainer}>
              <div className={styles.SemiTitle}>소통왕👑 달성하는 꿀팁</div>
              <div className={styles.DivisionLine} />
              <div className={styles.Content}>
                소통왕은 다양한 사람들에게 많은 편지를 <br/>작성한 사람입니다. <br/>편지를 많이 작성해서 소통왕이 되어보세요!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RankingInformation