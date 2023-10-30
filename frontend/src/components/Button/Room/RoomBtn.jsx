import styles from "./RoomBtn.module.css"

const RoomBtn = ({ img, onClick }) => {
  return (
    <div className={styles.circle} onClick={onClick}>
      {/* img버튼 상세 표기 */}
      {/* addUser / heart / post / postBox / roomEdit / share / worldMap */}
      <img src={`./assets/icons/${img}.svg`} />
    </div>
  )
}

export default RoomBtn
