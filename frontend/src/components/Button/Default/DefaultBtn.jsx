import styles from "./DefaultBtn.module.css"

const DefaultBtn = ({ btnName, onClick, color }) => {
  const checkColor = () => {
    return { backgroundColor: color, color: "#2C2C2C" }
  }
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;

  return (
    <div
      className={styles.ButtonContainer}
      onClick={onClick}
      style={checkColor()}
    >
      <img src={`${urlPath}/assets/images/house.png`} alt="" style={{height: '50px', width: '60px'}}/>
      <p className={styles.ButtonContent}>{btnName}</p>
    </div>
  )
}

export default DefaultBtn
