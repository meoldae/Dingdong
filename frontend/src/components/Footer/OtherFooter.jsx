import style from "./Footer.module.css";

const OtherFooter = () => {
  const icon = "assets/icons/";

  return (
    <div className={style.wrap}>
      <div className={style.secondFooter}>
        <div className={style.background}>
          <img src={`${icon}heart.svg`} alt="" />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.background}>
          <img src={`${icon}worldMap.svg`} />
        </div>
        <div className={style.background}>
          <img src={`${icon}post.svg`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OtherFooter;
