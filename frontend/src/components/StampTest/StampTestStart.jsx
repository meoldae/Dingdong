import React from "react"
import SharingModalList from "../Modal/Sharing/SharingModalList"
import styles from "./StampTestStart.module.css"

const StampTestStart = (props) => {
  return (
    <div className={styles.Container}>
      <img
        src={"assets/images/stamp_start.svg"}
        style={{
          width: "250px",
          height: "300px",
          marginBottom: "15px",
          marginTop: "115px",
        }}
      />
      <div className={styles.ContentContainer}>
        <p>당신에게 어울리는</p> <p>우표를 찾아보세요.</p>
      </div>
      <div onClick={props.onTestModeHanlder} className={styles.StartButton}>
        시작하기
      </div>
      <SharingModalList shareMode={"start"} />
    </div>
  )
}

export default StampTestStart
