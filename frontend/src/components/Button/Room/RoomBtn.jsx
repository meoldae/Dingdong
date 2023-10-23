import styles from "./RoomBtn.module.css"

const RoomBtn = ({ img, onClick }) => {
  return (
    <div className={styles.circle} onClick={onClick}>
      <img src={`assets/icons/${img}.svg`} />
    </div>
  )
}

export default RoomBtn
