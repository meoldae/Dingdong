import styles from "./NeighborAcceptModal.module.css"

const NeighborAcceptModal = ({ content, okClick, cancelClick }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>
        {content}으로 부터 이웃신청이 왔습니다.
      </div>
      <div className={styles.ButtonContainer}>
        <div
          className={styles.Button}
          style={{ color: "#FFFFFF" }}
          onClick={okClick}
        >
          수락
        </div>
        <div
          className={styles.Button}
          style={{ color: "#000000" }}
          onClick={cancelClick}
        >
          거절
        </div>
      </div>
    </div>
  )
}

export default NeighborAcceptModal
