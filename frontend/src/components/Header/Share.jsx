import style from "./Header.module.css";

const Share = () => {
  const icon = "assets/icons/";
  return (
    <div className={style.wrap}>
      <div className={style.share}>
        <div className={style.shareImg}>
          <img src={`${icon}share.svg`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Share;
