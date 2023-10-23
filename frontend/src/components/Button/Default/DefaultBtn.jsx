import styles from "./DefaultBtn.module.css"

const DefaultBtn = ({ btnName, onClick }) => {
  return (
    <div className={styles.ButtonContainer} onClick={onClick}>
      <p>{btnName}</p>
    </div>
  )
}

export default DefaultBtn
