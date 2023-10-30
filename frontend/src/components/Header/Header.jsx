import style from "./Header.module.css"
import hamburger from "/assets/icons/hamburgerbar.svg"
import bell from "/assets/icons/bell.svg"
import { userAtom } from "../../atom/UserAtom"
import { useRecoilValue } from "recoil"

const Header = ({ checkMyRoom }) => {
  const icon = "/assets/icons/"

  // 유저정보
  const userInfo = useRecoilValue(userAtom)

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <img src={hamburger} alt="" />
        {checkMyRoom === "my" ? (
          <div className={style.userName}>{userInfo.nickname}</div>
        ) : (
          <div className={style.userName}>userName</div>
        )}
        <img src={bell} alt="" />
      </div>
    </div>
  )
}

export default Header
