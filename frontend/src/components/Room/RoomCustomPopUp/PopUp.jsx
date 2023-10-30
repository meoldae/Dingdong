import styles from "./PopUp.module.css";
import PopUpContent from "./PopUpContent";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { popUpStatusAtom } from "../../../atom/RoomCustomTabAtom";
import { ItemsState, buildModeState, draggedItemState } from "../Atom";
import { updateFurnitureList } from "../../../api/Furniture";
import { userAtom } from "../../../atom/UserAtom";

const PopUp = () => {
  const [tabStatus, setTabStatus] = useState(0);
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom);
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const isDragging = useRecoilValue(draggedItemState);
  const changeMenu = (image, menuIndex) => {
    setTabStatus(menuIndex);
  };
  const [items, setItems] = useRecoilState(ItemsState);
  const [check, setCheck] = useState(null);
  const userInfo = useRecoilValue(userAtom);

  const myRoomId = userInfo.roomId;
  useEffect(() => {
    if (check) {
      return;
    } else {
      setCheck(items);
    }
  }, [check,items]);
  const popUpClose = () => {
    setPopUpStatus(false);
    setTabStatus(0);
    setEditMode(false);
    setItems(check);
  };
  const roomCustomSave = () => {
    setCheck(null);
    const updatedItem = items.map(item => {
        // console.log("items : ", item);
        const{size,defaultPosition,categoryId,gridPosition, ...rest} = item;
        // console.log("rest : ", rest);
        return rest;
    })
    const roomItem = {
        roomId : myRoomId,
        updateFurnitureList : updatedItem,
    }
    console.log(roomItem)
    updateFurnitureList(roomItem,(response)=>{
        console.log(response)
    })
};

  const imagePath = "/assets/images/roomCustom/";
  const images = [
    "all.png",
    "furniture.png",
    "carpets.png",
    "wallHanging.png",
    "props.png",
  ];

  return (
    <div
      className={`${styles.popUpContainer} ${
        popUpStatus ? styles.active : styles.notActive
      }`}
    >
      {isDragging ? (
        <div className={styles.popUpCloseerr}>
          <img
            src="/assets/icons/cross.svg"
            className={styles.closeVector}
          />
        </div>
      ) : (
        <div className={styles.popUpClose} onClick={() => popUpClose()}>
          <img
            src="/assets/icons/cross.svg"
            className={styles.closeVector}
          />
        </div>
      )}

      {isDragging ? (
        <div
          className={styles.customSaveButtonErr}
        >
          <img
            src="/assets/icons/save.svg"
            className={styles.customSaveVector}
          />
        </div>
      ) : (
        <div
          className={styles.customSaveButton}
          onClick={() => roomCustomSave()}
        >
          <img
            src="/assets/icons/save.svg"
            className={styles.customSaveVector}
          />
        </div>
      )}

      <ul className={styles.tabBar}>
        {images.map((image, index) => (
          <li
            key={index}
            className={`${tabStatus === index ? "active" : ""}`}
            onClick={() => changeMenu(image, index)}
          >
            <img
              src={imagePath + image}
              alt={`Image ${index + 1}`}
              style={{
                height: "60%",
                objectFit: "cover",
              }}
            />
          </li>
        ))}
      </ul>

      <div className={styles.content}>
        <PopUpContent category={tabStatus}></PopUpContent>
      </div>
    </div>
  );
};

export default PopUp;
