import styles from "./DefaultBtn.module.css"

const DefaultBtn = ({ btnName, onClick, color }) => {
  const checkColor = () => {
    if (color === "#049463") {
      return { backgroundColor: color, color: "#FFFFFF" }
    } else {
      return { backgroundColor: "#F2CBE4", color: "#2C2C2C" }
    }
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
