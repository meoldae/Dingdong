import styles from "./Letter.module.css"
const Letter = ({ letterTitle, checkRead }) => {
  return (
    <div className={styles.letterContainer}>
      <img src="assets/icons/writingPad.svg" alt="" />
      <div className={styles.letterTitle}>{letterTitle}</div>
    </div>
  )
}

export default Letter
