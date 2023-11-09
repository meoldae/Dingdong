import styles from "./PopUpContent.module.css";
import React, { useState, useEffect } from "react";
import { getFurnitureList, getFurnitureDetail } from "@/api/Furniture";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import {
  ItemRotateState,
  ItemsState,
  colorChangeState,
  dragPositionState,
  draggedItemState,
  lightColorState,
  roomColorState,
} from "../Atom";
import {
  GithubPicker,
  BlockPicker,
  SliderPicker,
  HuePicker,
  AlphaPicker,
  CirclePicker,
} from "react-color";
const PopUpContent = (props) => {
  const [furnitureList, setFurnitureList] = useState([]);
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;
  const imagePath = `${urlPath}/assets`;
  const [pageNo, setPageNo] = useState(0);
  const target = useRef();
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [items, setItems] = useRecoilState(ItemsState);
  const [draggedItem, setDraggedItem] = useRecoilState(draggedItemState);
  const [dragPosition, setDraggPosition] = useRecoilState(dragPositionState);
  const [draggedItemRotation, setDraggedItemRotation] =
    useRecoilState(ItemRotateState);
  const [roomColor, setRoomColor] = useRecoilState(roomColorState);
  const [lightColor, setLightColor] = useRecoilState(lightColorState);
  const [colorChange, setColorChange] = useRecoilState(colorChangeState);
  // console.log(lightColor)
  // console.log(roomColor)
  const addFurniture = (furnitureId, check) => {
    console.log(furnitureId)
    // 색상 변경 로직 추가

    if (draggedItem === null) {
      // console.log(furnitureId)
      getFurnitureDetail(
        furnitureId,
        (response) => {
          const data = response.data.data;
          const addFurniture = {
            categoryId: data.categoryId,
            furnitureId: data.furnitureId,
            defaultPosition: [data.xDefault, data.yDefault, data.zDefault],
            size: [data.xSize, data.ySize, data.zSize],
            position: [10, 8, 10],
            rotation: 0,
            roomFurnitureId: -1,
          };
          let newIndex;
          setItems((prevItems) => {
            newIndex = prevItems.length; // 임시 변수에 인덱스 저장
            return [...prevItems, addFurniture];
          });
          checkList(newIndex, addFurniture.position, addFurniture.rotation);
          // 비동기 문제 처리해보자..
        },
        (error) => {
          console.log("Error at fetching Furniture Detail ...", error);
        }
      );
    }
  };
  const checkList = (index, position, rotation) => {
    setDraggedItem(index);
    setDraggPosition(position);
    setDraggedItemRotation(rotation);
  };

  // 가구 리스트 받아오는 함수
  const fetchList = () => {
    getFurnitureList(
      pageNo,
      props.category,
      (response) => {
        const fetchingList = response.data.data.content;
        setFurnitureList((furnitureList) => furnitureList.concat(fetchingList));
        if (fetchingList.length < 6) {
          setIsEnd(true);
        }
      },
      (error) => {
        console.error("Error at fetching Furniture List...", error);
      }
    );
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (!isEnd) {
              setPageNo((prevPageNo) => prevPageNo + 1);
            }
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(target.current);

      if (isEnd) {
        observer.unobserve(target.current);
      }
    }
  }, [loading]);

  // Tab 바뀌어서 새로 조회해야할 때
  useEffect(() => {
    setFurnitureList([]);
    setPageNo(0);
    setIsEnd(false);
  }, [props.category]);

  // 새 페이지 로딩될 때
  useEffect(() => {
    fetchList();
  }, [pageNo]);
  const wallColors = [
    "#ffffff",
    "#fefae0",
    "#D9E3F0",
    "#d0f4de",
    "#eeef20",
    "#fec5bb",
    "#ffc8dd",
    "#d6c6ff",
    "#c77dff",
    "#caf0f8",
    "#4ea8de",
    "#e9c46a",
    "#a3b18a",
    "#b7b7a4",
    "#8b5e34",
    "#14213d",
  ];

  const lightColors = [
    "#FF6347",
    "#FF0000",
    "#DC143C",
    "#B22222",
    "#FF4500",
    "#FF8C00",
    "#FFA500",
    "#FF7F50",
    "#FFFF00",
    "#FFFFE0",
    "#FFFACD",
    "#FFD700",
    "#008000",
    "#00FF00",
    "#7CFC00",
    "#ADFF2F",
    "#0000FF",
    "#0000CD",
    "#ADD8E6",
    "#87CEEB",
    "#4B0082",
    "#191970",
    "#000080",
    "#6A5ACD",
    "#800080",
    "#8A2BE2",
    "#9370DB",
    "#DDA0DD",
    "#FFC0CB",
    "#FF69B4",
    "#FF1493",
    "#ffffff",
  ];
  return (
    <div className={styles.furnitureContainer}>
      {furnitureList.map((item, index) => (
        <img
          key={index}
          src={imagePath + `/models/roomitemspng/${item["furnitureId"]}.png`}
          onClick={() => addFurniture(item["furnitureId"], item.categoryId)}
        />
      ))}
      <div className={styles.endPoint} ref={target}>
        {colorChange ? (
          <>
            <div className={styles.colorsetting}>
              <h3>벽 색상을 변경해봐요!</h3>
              <CirclePicker
                colors={wallColors}
                circleSize={30}
                width="300px"
                circleSpacing={7}
                onChange={(e) => setRoomColor(e.hex)}
              />
              <h3>조명을 바꿔봐요!</h3>
            </div>
            <SliderPicker
              className={styles.my}
              color={lightColor}
              onChange={(e) => {
                console.log(e)
                setLightColor(e.hex);
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PopUpContent;
