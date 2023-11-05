import React from "react";
import styles from "./DefaultPostBtn.module.css";
const DefaultPostBtn = ({ btnName, color, onClick }) => {
  return (
    <div className={`${styles.btn} ${styles[color]}`} onClick={onClick}>
      <p className={styles.word}>{btnName}</p>
    </div>
  );
};

export default DefaultPostBtn;
