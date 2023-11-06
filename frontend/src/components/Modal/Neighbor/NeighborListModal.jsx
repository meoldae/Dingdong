import styles from "./NeighborListModal.module.css"

const NeighborListModal = ({ imgName, nickname, gohome, remove, status }) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  return (
    <div className={styles.Container}>
      <div className={styles.ProfileContainer}>
        <div
          className={status ? styles.StatusOnDot : styles.StatusOffDot}
        ></div>
        <img src={`${urlPath}/assets/icons/${imgName}.png`} />
      </div>
      <div className={styles.InfoContainer}>
        <div
          style={{
            // fontFamily: "Pretendard-SemiBold",
            fontSize: "20px",
            marginLeft: "15px",
          }}
        >
          {nickname}
        </div>
        <div>
          <img
            src={`${urlPath}/assets/icons/home.png`}
            style={{ marginRight: "10px", width: "25px", height: "25px" }}
            onClick={gohome}
          />
          <img
            src={`${urlPath}/assets/icons/removeNeighbor.png`}
            style={{ marginRight: "15px", width: "25px", height: "25px" }}
            onClick={remove}
          />
        </div>
      </div>
    </div>
  )
}

export default NeighborListModal
