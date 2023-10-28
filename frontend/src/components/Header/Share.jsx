import RoomBtn from "../Button/Room/RoomBtn";
import style from "./Header.module.css";
import html2canvas from "html2canvas";
import React, { useState } from "react";
import SharePage from "../Modal/Share/SharePage";


const Share = ({ canvasRef }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const onCapture = () => {
    html2canvas(canvasRef.current).then((canvas) => {
      const croppedCanvas = document.createElement("canvas");
      const ctx = croppedCanvas.getContext("2d");

      // 집 모양의 중심 좌표
      const centerX = canvas.width/2 +10; // 집 모양의 중심 x 좌표를 여기에 입력
      const centerY = canvas.height/2 - 100; // 집 모양의 중심 y 좌표를 여기에 입력

      // 잘라낼 영역의 크기 설정
      const width = centerX *1.8;
      const height = centerY * 1.5;

      // 중심 좌표를 기준으로 잘라낼 영역의 시작 좌표 계산
      const startX = centerX - width / 2;
      const startY = centerY - height / 2;

      croppedCanvas.width = width;
      croppedCanvas.height = height;

      // 원본 캔버스에서 잘라낼 영역만 croppedCanvas에 그리기
      ctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);

      setImageSrc(croppedCanvas.toDataURL("image/png"));
      setShowModal(true);
    });
  };

  return (
    <div className={style.wrap}>
      <div className={style.share}>
        <div className={style.shareImg} onClick={onCapture}>
          <RoomBtn img={"share"} />
        </div>
      </div>
      {showModal && (
        <SharePage imageSrc={imageSrc} />
      )}
    </div>
  );
};

export default Share;
