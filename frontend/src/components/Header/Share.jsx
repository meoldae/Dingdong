import RoomBtn from "../Button/Room/RoomBtn"
import styles from "./Header.module.css"
import React from "react"
const Share = ({ setShareModal }) => {
  return (
    <div className={styles.Share}>
      <RoomBtn img={"share"} onClick={() => setShareModal(true)} />
    </div>
  )
}

export default Share
