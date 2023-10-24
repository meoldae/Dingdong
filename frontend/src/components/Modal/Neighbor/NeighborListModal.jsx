import styles from "./NeighborListModal.module.css"

const NeighborListModal = ({ profile, nickname }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ProfileContainer}>
        <img src={profile} />
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
          <img src={"assets/icons/home.svg"} style={{ marginRight: "10px" }} />
          <img
            src={"assets/icons/removeNeighbor.svg"}
            style={{ marginRight: "15px" }}
          />
        </div>
      </div>
    </div>
  )
}

export default NeighborListModal
