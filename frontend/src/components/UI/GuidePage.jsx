import React from "react"
import styles from "./GuidePage.module.css"
const GuidePage = ({ onClick }) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  return (
    <div className={styles.guideContainer}>
      <div className={styles.guideCharacter}>
        <img src={`${urlPath}/assets/images/tap.gif`} alt="" />
      </div>
      <div className={styles.guideTitle}>
        {`원하는 곳을 터치해 \n 캐릭터를 움직여보세요!`}
      </div>
      <div className={styles.guideContent}>
        {`Tip! 길을 따라가며 딩동 마을의\n 다양한 컨텐츠를 즐겨보세요! `}
      </div>
      <div className={styles.guideButton} onClick={onClick}>
        <div style={{height: "20px"}}>시작하기</div>
      </div>
    </div>
  )
}

export default GuidePage
