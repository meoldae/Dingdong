import React from "react"
import styles from "./RandomBtn.module.css"

const RandomBtn = ({ onClick }) => {
  return (
    <button className={styles.button82Pushable} role="button" onClick={onClick}>
      <span className={styles.button82Shadow}></span>
      <span className={styles.button82Edge}></span>
      <span className={`${styles.button82Front} ${styles.text}`}>랜덤 방문</span>
    </button>
  )
}

export default RandomBtn
