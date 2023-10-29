import style from "./Header.module.css"
import hamburger from "../../../public/assets/icons/hamburgerbar.svg"
import bell from "../../../public/assets/icons/bell.svg"
const Header = () => {
  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <img src={hamburger} alt="" />
        <div className={style.userName}>userName</div>
        <img src={bell} alt="" />
      </div>
    </div>
  )
}

export default Header
