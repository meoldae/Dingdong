import styles from "./NeighborModal.module.css"

const NeighborModal = ({ content, okClick, cancelClick }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>
        {content}으로 부터 이웃신청이 왔습니다.
      </div>
      <div className={styles.HorizontalLine} />
      <div className={styles.VerticalLine} />
      <div className={styles.ButtonContainer}>
        <div
          className={styles.Button}
          style={{ color: "#049463" }}
          onClick={okClick}
        >
          수락
        </div>
        <div
          className={styles.Button}
          style={{ color: "#2C2C2C" }}
          onClick={cancelClick}
        >
          거절
        </div>
      </div>
    </div>
  )
}

export default NeighborModal
