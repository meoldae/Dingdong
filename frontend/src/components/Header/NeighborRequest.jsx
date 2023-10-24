import style from "./Header.module.css";

const NeighborRequset = () => {
  const icon = "assets/icons/";
  return (
    <div className={style.wrap}>
      <div className={style.share}>
        <div className={style.shareImg}>
          <img src={`${icon}addUser.svg`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NeighborRequset;
