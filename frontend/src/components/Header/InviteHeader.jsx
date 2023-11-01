// 라이브러리
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

// 스타일
import styles from "./Header.module.css"

// 이미지
import hamburger from "/assets/icons/hamburgerbar.svg"
import bell from "/assets/icons/bell.png"

// 컴포넌트
import NeighborAcceptModal from "../Modal/Neighbor/NeighborAcceptModal"
import RoomBtn from "../Button/Room/RoomBtn"
import NeighborListModal from "../Modal/Neighbor/NeighborListModal"
import DefaultModal from "../Modal/Default/DefaultModal"

// Atom
import { roomInfoAtom } from "../../atom/RoomInfoAtom"

const Header = ({ checkMyRoom }) => {
  const roomInfo = useRecoilValue(roomInfoAtom)
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  
  return (
    <>
      <div className={styles.wrap}>
        <div
          className={
            checkMyRoom === "invite" ? styles.inviteHeader : styles.header
          }
        >
          {checkMyRoom === "invite" ? (
            <div className={styles.userName}>{roomInfo}</div>
          ) : (
            <>
              <img
                src={hamburger}
                onClick={() => setIsHamburger(true)}
                className={styles.HamburgerButton}
              />
              <div className={styles.userName}>
                {checkMyRoom === "my" ? userInfo.nickname : roomInfo}
              </div>
              <img src={bell} onClick={alarmHandler} />
            </>
          )}
        </div>
      </div>
  
    </>
  )
}
export default Header
