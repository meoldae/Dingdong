import styles from "./NeighborListModal.module.css"

const NeighborListModal = ({ imgName, nickname }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ProfileContainer}>
        <img src={`assets/images/${imgName}.jpg`} />
      </div>
      <div className={styles.InfoContainer}>
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "20px",
            marginLeft: "15px",
          }}
        >
          {nickname}
        </div>
        <div>
          <img src={"assets/icons/home.png"} style={{ marginRight: "10px" }} />
          <img
            src={"assets/icons/removeNeighbor.png"}
            style={{ marginRight: "15px" }}
          />
        </div>
      </div>
    </div>
  )
}

export default NeighborListModal
