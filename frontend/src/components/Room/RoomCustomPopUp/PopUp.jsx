import styles from "./PopUp.module.css"
import PopUpContent from "./PopUpContent"
import React, { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { popUpStatusAtom } from "../../../atom/RoomCustomTabAtom"
import {
  ItemRotateState,
  ItemsState,
  buildModeState,
  canDropState,
  checkState,
  colorChangeState,
  dragPositionState,
  draggedItemState,
  lightColorState,
  mobileCheckState,
  roomColorState,
} from "../Atom"
import { updateFurnitureList } from "../../../api/Furniture"
import { userAtom } from "../../../atom/UserAtom"
import toast from "react-hot-toast"

const PopUp = () => {
  const [tabStatus, setTabStatus] = useState(0)
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom)
  const [editMode, setEditMode] = useRecoilState(buildModeState)
  const [draggedItem, setDraggedItem] = useRecoilState(draggedItemState)
  const [animationState, setAnimationState] = useState("opening")
  const [lightColor, setLightColor] = useRecoilState(lightColorState)
  const [roomColor, setRoomColor] = useRecoilState(roomColorState)
  const [colorChange, setColorChange] = useRecoilState(colorChangeState)
  const changeMenu = (image, menuIndex) => {
    setTabStatus(menuIndex)
    if (menuIndex === 7) {
      setColorChange(true)
    } else {
      setColorChange(false)
    }
  }
  const [items, setItems] = useRecoilState(ItemsState)
  const [check, setCheck] = useRecoilState(checkState)
  const [canDrop, setCanDrop] = useRecoilState(canDropState)
  const [dragPosition, setDraggPosition] = useRecoilState(dragPositionState)
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState)
  const [lightCheck, setLightCheck] = useState(null)
  const [roomCheck, setRoomCheck] = useState(null)
  const userInfo = useRecoilValue(userAtom)
  const mobileCheck =
    /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  const myRoomId = userInfo.roomId
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  useEffect(() => {
    if (check) {
      return
    } else {
      setCheck(items)
    }
  }, [check, items])

  useEffect(() => {
    if (roomCheck) {
      return
    } else {
      setRoomCheck(roomColor)
    }
  }, [roomCheck, roomColor])
  useEffect(() => {
    if (lightCheck) {
      return
    } else {
      setLightCheck(lightColor)
    }
  }, [lightCheck, lightColor])

  const popUpClose = () => {
    setAnimationState("closing")
    setEditMode(false)
    setItems(check)
    setLightColor(lightCheck)
    setRoomColor(roomCheck)
    setTabStatus(0)
    setColorChange(false)
    setTimeout(() => {
      // toast.error("취소되었습니다!");
      setAnimationState("opening") // 초기화
      setPopUpStatus(false)
    }, 300)
  }
  const roomCustomSave = () => {
    setCheck(null)
    setLightCheck(null)
    setRoomCheck(null)
    const updatedItem = items.map((item) => {
      const { size, defaultPosition, categoryId, gridPosition, ...rest } = item
      return rest
    })
    const roomItem = {
      roomId: myRoomId,
      updateFurnitureList: updatedItem,
      wallColor: roomColor,
      lightColor: lightColor,
    }
    updateFurnitureList(roomItem, (response) => {})
      .then((res) => {
        toast.success("저장되었습니다!")
        setEditMode(false)
        setPopUpStatus(false)
        setColorChange(false)
      })
      .catch((res) => {
        toast.error("에러가 발생했습니다!")
      })
  }

  const imagePath = `${urlPath}/assets/images/roomCustom/`
  const images = [
    "all.png",
    "furniture.png",
    "carpets.png",
    "wallHanging.png",
    "props.png",
  ]

  return (
    <>
      {popUpStatus && (
        <div className={`${styles.popUpContainer} ${styles[animationState]}`}>
          {draggedItem !== null && editMode && (
            <div className={styles.dragPopUp}>
              <img
                src={`${urlPath}/assets/icons/refresh.png`}
                alt=""
                onClick={() => {
                  if (items[draggedItem].categoryId === 3) {
                    setDraggedItemRotation(
                      draggedItemRotation === 1 ? 0 : draggedItemRotation + 1
                    )
                  } else {
                    setDraggedItemRotation(
                      draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
                    )
                  }
                }}
              />
              <img
                src={`${urlPath}/assets/icons/cross.png`}
                alt=""
                onClick={() => {
                  setItems((prevItems) => {
                    return prevItems.filter((_, index) => index !== draggedItem)
                  })
                  setDraggedItem(null)
                  setDraggedItemRotation(null)
                }}
              />
              {mobileCheck &&
                (canDrop ? (
                  <img
                    src={`${urlPath}/assets/icons/check.png`}
                    alt=""
                    onClick={() => {
                      if (draggedItem !== null && dragPosition) {
                        if (canDrop) {
                          setItems((prev) => {
                            const newItems = prev.map((item, index) => {
                              if (index === draggedItem) {
                                return {
                                  ...item,
                                  position: dragPosition,
                                  rotation: draggedItemRotation,
                                }
                              }
                              return item
                            })
                            return newItems
                          })
                        } else {
                          if (
                            check.length !== items.length &&
                            draggedItem === items.length - 1
                          ) {
                            setItems((prevItems) => {
                              return prevItems.filter(
                                (_, index) => index !== draggedItem
                              )
                            })
                          }
                        }
                        setDraggedItemRotation(null)
                        setDraggedItem(null)
                      }
                    }}
                  />
                ) : (
                  <img src={`${urlPath}/assets/icons/check.png`} />
                ))}
            </div>
          )}

          {draggedItem !== null ? (
            <div className={styles.popUpCloseerr}>
              <img
                src={`${urlPath}/assets/icons/cross.png`}
                className={styles.closeVector}
              />
            </div>
          ) : (
            <div className={styles.popUpClose} onClick={() => popUpClose()}>
              <img
                src={`${urlPath}/assets/icons/cross.png`}
                className={styles.closeVector}
              />
            </div>
          )}

          {draggedItem !== null ? (
            <div className={styles.customSaveButtonErr}>
              <img
                src={`${urlPath}/assets/icons/save.png`}
                className={styles.customSaveVector}
              />
            </div>
          ) : (
            <div
              className={styles.customSaveButton}
              onClick={() => roomCustomSave()}
            >
              <img
                src={`${urlPath}/assets/icons/save.png`}
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
            <li>
              <img
                className={styles.roller}
                src={imagePath + "painting-brush.png"}
                onClick={() => changeMenu(0, 7)}
              />
            </li>
          </ul>

          <div className={styles.content}>
            <PopUpContent category={tabStatus}></PopUpContent>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUp
