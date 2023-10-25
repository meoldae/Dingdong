import style from "./Header.module.css";

const Header = () => {
  const icon = "assets/icons/";
  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <img src={`${icon}hamburgerbar.svg`} alt="" />
        <div className={style.userName}>userName</div>
        <img src={`${icon}bell.svg`} alt="" />
      </div>
    </div>
  );
};

export default Header;
