import styles from "./RoomBtn.module.css"

const RoomBtn = ({ img }) => {
  return (
    <div className={styles.circle}>
      <img src={`assets/icons/${img}.svg`} />
    </div>
  )
}

export default RoomBtn
