import styles from "./PopUp.module.css";
import PopUpContent from "./PopUpContent";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { popUpStatusAtom } from "../../../atom/RoomCustomTabAtom";
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  canDropState,
  checkState,
  dragPositionState,
  draggedItemState,
  mobileCheckState,
} from "../Atom";
import { updateFurnitureList } from "../../../api/Furniture";
import { userAtom } from "../../../atom/UserAtom";

const PopUp = () => {
  const [tabStatus, setTabStatus] = useState(0);
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom);
  const [editMode, setEditMode] = useRecoilState(buildModeState);
  const [draggedItem, setDraggedItem] = useRecoilState(draggedItemState);
  const changeMenu = (image, menuIndex) => {
    setTabStatus(menuIndex);
  };
  const [items, setItems] = useRecoilState(ItemsState);
  const [check, setCheck] = useRecoilState(checkState);
  const [canDrop, setCanDrop] = useRecoilState(canDropState);
  const [dragPosition, setDraggPosition] = useRecoilState(dragPositionState);
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState);
  const userInfo = useRecoilValue(userAtom);
  const mobileCheck = useRecoilValue(mobileCheckState);
  const myRoomId = userInfo.roomId;
  useEffect(() => {
    if (check) {
      return;
    } else {
      setCheck(items);
    }
  }, [check, items]);
  const popUpClose = () => {
    setPopUpStatus(false);
    setTabStatus(0);
    setEditMode(false);
    setItems(check);
  };
  const roomCustomSave = () => {
    setCheck(null);
    const updatedItem = items.map((item) => {
      const { size, defaultPosition, categoryId, gridPosition, ...rest } = item;
      return rest;
    });
    const roomItem = {
      roomId: myRoomId,
      updateFurnitureList: updatedItem,
    };
    updateFurnitureList(roomItem, (response) => {}).then((res) => {
      setEditMode(false);
      setPopUpStatus(false);
    });
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
      {draggedItem !== null && editMode && (
        <div className={styles.dragPopUp}>
          <img
            src="/assets/icons/refresh.svg"
            alt=""
            onClick={() => {
              if (items[draggedItem].categoryId === 3) {
                setDraggedItemRotation(
                  draggedItemRotation === 1 ? 0 : draggedItemRotation + 1
                );
              } else {
                setDraggedItemRotation(
                  draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
                );
              }
            }}
          />
          <img
            src="/assets/icons/cross.svg"
            alt=""
            onClick={() => {
              setItems((prevItems) => {
                return prevItems.filter((_, index) => index !== draggedItem);
              });
              setDraggedItem(null);
              setDraggedItemRotation(null);
            }}
          />
          {mobileCheck &&
            (canDrop ? (
              <img
                src="/assets/icons/check.svg"
                alt=""
                onClick={() => {
                  if (draggedItem !== null && dragPosition) {
                    if (canDrop) {
                      setItems((prev) => {
                        console.log(prev);
                        const newItems = prev.map((item, index) => {
                          if (index === draggedItem) {
                            return {
                              ...item,
                              position: dragPosition,
                              rotation: draggedItemRotation,
                            };
                          }
                          return item;
                        });
                        return newItems;
                      });
                    } else {
                      if (
                        check.length !== items.length &&
                        draggedItem === items.length - 1
                      ) {
                        setItems((prevItems) => {
                          return prevItems.filter(
                            (_, index) => index !== draggedItem
                          );
                        });
                      }
                    }
                    setDraggedItemRotation(null);
                    setDraggedItem(null);
                  }
                }}
              />
            ) : (
              <img src="/assets/icons/check.svg" />
            ))}
        </div>
      )}

      {draggedItem !== null ? (
        <div className={styles.popUpCloseerr}>
          <img src="/assets/icons/cross.svg" className={styles.closeVector} />
        </div>
      ) : (
        <div className={styles.popUpClose} onClick={() => popUpClose()}>
          <img src="/assets/icons/cross.svg" className={styles.closeVector} />
        </div>
      )}

      {draggedItem !== null ? (
        <div className={styles.customSaveButtonErr}>
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
