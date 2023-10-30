import styles from "./PopUpContent.module.css";
import React, { useState, useEffect } from "react";
import { getFurnitureList, getFurnitureDetail } from "@/api/Furniture";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { ItemRotateState, ItemsState, dragPositionState, draggedItemState } from "../Atom";

const PopUpContent = (props) => {
  const [furnitureList, setFurnitureList] = useState([]);
  const imagePath = "../../../../public/assets/";
  const [pageNo, setPageNo] = useState(0);
  const target = useRef();
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [items, setItems] = useRecoilState(ItemsState);
  const [draggedItem, setDraggedItem] = useRecoilState(draggedItemState);
  const [dragPosition,setDraggPosition] = useRecoilState(dragPositionState);
  const [draggedItemRotation, setDraggedItemRotation] = useRecoilState(ItemRotateState);
  const addFurniture = (furnitureId) => {
    getFurnitureDetail(
      furnitureId,
      (response) => {
        const data = response.data.data;
        const addFurniture = {
          categoryId: data.categoryId,
          furnitureId: data.furnitureId,
          defaultPosition: [data.xDefault, data.yDefault, data.zDefault],
          size: [data.xSize, data.ySize, data.zSize],
          position: [0, 0, 0],
          rotation: 0,
          roomFurnitureId:-1,
        };
        let newIndex;
        setItems((prevItems) => {
          // console.log(prevItems)
          newIndex = prevItems.length; // 임시 변수에 인덱스 저장
          return [...prevItems, addFurniture];
        });
        checkList(newIndex,addFurniture.position,addFurniture.rotation);
        // 비동기 문제 처리해보자..
      },
      (error) => {
        console.log("Error at fetching Furniture Detail ...", error);
      }
    );
  };
  const checkList=(index,position,rotation)=>{
    setDraggedItem(index);
    setDraggPosition(position);
    setDraggedItemRotation(rotation);
  }


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

  return (
    <div className={styles.furnitureContainer}>
      <div>
        {furnitureList.map((item, index) => (
          <img
            key={index}
            src={imagePath + `/models/roomitemspng/${item["furnitureId"]}.png`}
            width={"33%"}
            height={"45%"}
            onClick={() => addFurniture(item["furnitureId"])}
          />
        ))}
      </div>
      <div className={styles.endPoint} ref={target}></div>
    </div>
  );
};

export default PopUpContent;
