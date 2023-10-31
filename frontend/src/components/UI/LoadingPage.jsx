// 라이브러리
import React from "react"
import { SyncLoader } from "react-spinners"

// 스타일
import styles from "./LoadingPage.module.css"

const LoadingPage = ({ content }) => {
  const IMG_NUMBER = 6 // 캐릭터 이미지 개수
  const number = Math.floor(Math.random() * IMG_NUMBER) + 1
  return (
    <div className={styles.Container}>
      <img src={`/assets/characters/${number}.png`} className={styles.Image} />
      <div className={styles.Content}>{content}</div>
      <SyncLoader />
    </div>
  )
}

export default LoadingPage
