// 라이브러리
import React from "react"
import { SyncLoader } from "react-spinners"

// 스타일
import styles from "./LoadingPage.module.css"

const LoadingPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>잠시만 기다려주세요.</div>
      <SyncLoader />
    </div>
  )
}

export default LoadingPage
