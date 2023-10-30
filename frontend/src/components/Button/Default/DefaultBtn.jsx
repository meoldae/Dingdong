import styles from "./DefaultBtn.module.css"

const DefaultBtn = ({ btnName, onClick, color }) => {
  const checkColor = () => {
    return { backgroundColor: color, color: "#2C2C2C" }
  }

  return (
    <div
      className={styles.ButtonContainer}
      onClick={onClick}
      style={checkColor()}
    >
      <p className={styles.ButtonContent}>{btnName}</p>
    </div>
  )
}

export default DefaultBtn
