import RoomBtn from "../Button/Room/RoomBtn";
import style from "./Header.module.css";

const Share = () => {
  const icon = "assets/icons/";
  return (
    <div className={style.wrap}>
      <div className={style.share}>
        <div className={style.shareImg}>
          <RoomBtn img={"share"}/>
        </div>
      </div>
    </div>
  );
};

export default Share;
