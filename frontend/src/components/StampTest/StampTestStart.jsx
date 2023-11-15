import React from "react"
import SharingModalList from "../Modal/Sharing/SharingModalList"
import styles from "./StampTestStart.module.css"
import { useNavigate } from "react-router-dom"

const StampTestStart = (props) => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const onHomeHandler = (e) => { 
    window.location.replace(`${urlPath}/`)
  }
  return (
    <div
      className={styles.Container}
    >
      <img
        src={`${urlPath}/assets/images/Stamp_Test_Start.png`}
        style={{
          width: "60%",
        }}
      />
      <div className={styles.ContentContainer}>
        <p>당신에게 어울리는</p> <p>우표를 찾아보세요.</p>
      </div>
      <div>
        <div onClick={props.onTestModeHanlder} className={styles.StartButton}>
          테스트 시작하기
        </div>
        <div className={styles.StartButton} onClick={onHomeHandler}>
          딩동 시작하기
        </div>
      </div>
      <SharingModalList shareMode={"start"} />
    </div>
  )
}

export default StampTestStart
