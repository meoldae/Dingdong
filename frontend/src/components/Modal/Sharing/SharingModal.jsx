import React from "react";
import { useSetRecoilState } from "recoil";
import SharingModalList from "../../Modal/Sharing/SharingModalList";
import styles from "./Share.module.css";
function SharingModal() {
  return (
    <div className={styles.share}>
      {/* <div>저장하기</div> */}
      <SharingModalList shareMode={"board"} />
    </div>
  );
}

export default SharingModal;
