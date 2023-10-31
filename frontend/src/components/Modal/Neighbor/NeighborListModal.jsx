import styles from "./NeighborListModal.module.css"

const NeighborListModal = ({ imgName, nickname, gohome, remove }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ProfileContainer}>
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
            src={"/assets/icons/home.svg"}
            style={{ marginRight: "10px" }}
            onClick={gohome}
          />
          <img
            src={"/assets/icons/removeNeighbor.svg"}
            style={{ marginRight: "15px" }}
            onClick={remove}
          />
        </div>
      </div>
    </div>
  )
}

export default NeighborListModal
