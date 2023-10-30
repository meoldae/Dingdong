import RoomBtn from "../Button/Room/RoomBtn";
import styles from "./Header.module.css";
import React from "react";
const Share = ({setShareModal}) => {

  return (
    <div className={styles.wrap}>
      <div className={styles.share}>
        <div className={styles.shareImg}>
          <RoomBtn img={"share"} onClick={()=>setShareModal(true)}/>
        </div>
      </div>
    </div>
  );
};

export default Share;
