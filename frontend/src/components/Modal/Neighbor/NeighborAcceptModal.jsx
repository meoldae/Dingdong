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
          style={{ color: "#FFFFFF", background: "#02C26F", boxShadow: "0px 4px 0px #009152" }}
          onClick={okClick}
        >
          수락
        </div>
        <div
          className={styles.Button}
          style={{ color: "#000000", background: "#ECECEC", boxShadow: "0px 4px 0px #858585" }}
          onClick={cancelClick}
        >
          거절
        </div>
      </div>
    </div>
  )
}

export default NeighborAcceptModal
