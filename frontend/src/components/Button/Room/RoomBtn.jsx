import styles from "./RoomBtn.module.css"

const imagePath = `/assets/icons/`

const RoomBtn = ({ img, onClick }) => {
  return (
    <div className={styles.circle} onClick={onClick}>
      {/* img버튼 상세 표기 */}
      {/* addUser / heart / post / postBox / roomEdit / share / worldMap */}
      <img src={`${imagePath}${img}.png`} />
    </div>
  )
}

export default RoomBtn
