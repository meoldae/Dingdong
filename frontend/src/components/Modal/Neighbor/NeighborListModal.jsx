import styles from "./NeighborListModal.module.css"

const NeighborListModal = ({ imgName, nickname, gohome, remove, status }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ProfileContainer}>
        <div
          className={status ? styles.StatusOnDot : styles.StatusOffDot}
        ></div>
        <img src={`/assets/characters/female${imgName}.png`} />
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
          <img
            src={"/assets/icons/home.png"}
            style={{ marginRight: "10px" }}
            onClick={gohome}
          />
          <img
            src={"/assets/icons/removeNeighbor.png"}
            style={{ marginRight: "15px" }}
            onClick={remove}
          />
        </div>
      </div>
    </div>
  )
}

export default NeighborListModal
