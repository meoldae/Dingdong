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
  CompactPicker,
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
  const [colorCheck, setColorCheck] = useState(true);
  const [wall, setWall] = useState("click");
  const [light, setLight] = useState("none");
  const addFurniture = (furnitureId, check) => {
    // 색상 변경 로직 추가
    if (draggedItem === null) {
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
    "#b80000",
    "#db3e00",
    "#fccb00",
    "#008b02",
    "#006b76",
    "#1273de",
    "#004dcf",
    "#5300eb",
    "#F36B59",
    "#7a706c",
    "#023664",
    "#000000",
    "#ececec",
    "#D9E3F0",
    "#ffc8dd",
    "#eb9694",
    "#fad0c3",
    "#fef3bd",
    "#c1e1c5",
    "#bedadc",
    "#c4def6",
    "#bed3f3",
    "#d4c4fb",
    "#A8B3D7",
  ];

  const handleColorChangeWall = () =>{
    setColorCheck(true);
    setWall("click");
    setLight("none");
  }
  const handleColorChangeLight = () =>{
    setColorCheck(false);
    setLight("click");
    setWall("none");
  }
  return (
    <div className={styles.furnitureContainer}>
      {furnitureList.map((item, index) => (
        <img
          key={index}
          src={imagePath + `/models/furnitureItemsPng/${item["furnitureId"]}.png`}
          onClick={() => addFurniture(item["furnitureId"], item.categoryId)}
        />
      ))}
      <div className={styles.endPoint} ref={target}>
        {colorChange ? (
          <>
            <div className={styles.btn}>
              <div
                onClick={() => {
                  handleColorChangeWall();
                }}
                className={`${styles.btndiv} ${styles[wall]}`}
              >
                벽지
              </div>
              <div
                onClick={() => {
                  handleColorChangeLight();
                }}
                className={`${styles.btndiv} ${styles[light]}`}
              >
                조명
              </div>
            </div>
            <div className={styles.colorsetting}>
              {colorCheck ? (
                <>
                  <h3>벽을 색칠해봐요!</h3>
                  <CirclePicker
                    className={styles.border}
                    colors={wallColors}
                    circleSize={30}
                    width="300px"
                    circleSpacing={7}
                    onChange={(e) => setRoomColor(e.hex)}
                  />
                </>
              ) : (
                <>
                  <h3>조명을 바꿔봐요!</h3>
                  <GithubPicker
                    colors={lightColors}
                    width="300px"
                    onChange={(e) => setLightColor(e.hex)}
                  />
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PopUpContent;
