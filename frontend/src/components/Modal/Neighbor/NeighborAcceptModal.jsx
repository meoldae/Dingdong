import styles from "./NeighborAcceptModal.module.css"

const NeighborAcceptModal = ({ okClick, cancelClick }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>이웃 요청을 하시겠습니까?</div>
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

export default NeighborAcceptModal
