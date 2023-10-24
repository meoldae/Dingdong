import styles from "./Letter.module.css"
const Letter = ({ letterTitle }) => {
  return (
    <div className={styles.letterContainer}>
      <img src="assets/images/post/letter.png" alt="" />
      <div className={styles.letterTitle}>{letterTitle}</div>
    </div>
  )
}

export default Letter
