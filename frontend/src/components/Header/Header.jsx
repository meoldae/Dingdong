// 라이브러리
import { useState } from "react"
import { useRecoilValue } from "recoil"

// 스타일
import styles from "./Header.module.css"

// 이미지
import hamburger from "/assets/icons/hamburgerbar.svg"
import bell from "/assets/icons/bell.svg"

// Atom
import { userAtom } from "../../atom/UserAtom"

const Header = ({ checkMyRoom }) => {
  // 햄버거메뉴바 상태관리
  const [isHamburger, setIsHamburger] = useState(false)

  // 유저정보
  const userInfo = useRecoilValue(userAtom)

  const alarmHandler = () => {
    console.log("알림창")
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <img
            src={hamburger}
            alt=""
            onClick={() => setIsHamburger(true)}
            style={{ zIndex: "4" }}
          />
          {checkMyRoom === "my" ? (
            <div className={styles.userName}>{userInfo.nickname}</div>
          ) : (
            <div className={styles.userName}>userName</div>
          )}
          <img src={bell} alt="" onClick={alarmHandler} />
        </div>
      </div>
      {isHamburger && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsHamburger(false)}
          />
          <div className={styles.HamburgerModal}>모달</div>
        </>
      )}
    </>
  )
}

export default Header
