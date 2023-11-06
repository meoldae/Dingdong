import React from "react"
import SharingModalList from "../Modal/Sharing/SharingModalList"
import styles from "./StampTestStart.module.css"

const StampTestStart = (props) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  return (
    <div className={styles.Container}>
      <img 
        src={`${urlPath}/assets/images/Stamp_Test.png`}
        style={{ 
          width: "80%",
        }}
      />
      <div className={styles.ContentContainer}>
        <p>당신에게 어울리는</p> <p>우표를 찾아보세요.</p>
      </div>
      <div onClick={props.onTestModeHanlder} className={styles.StartButton}>
        시작
      </div> 
      <div className={styles.dingdongButton}> 
        딩동
      </div>
      <SharingModalList shareMode={"start"} />
    </div>
  )
}

export default StampTestStart
