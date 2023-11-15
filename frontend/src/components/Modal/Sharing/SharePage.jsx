import { useEffect, useState } from "react";
import styles from "./Share.module.css";
import html2canvas from "html2canvas";
import {useRecoilState} from "recoil";
import { textareaAtom } from '../../../atom/TextareaAtom';
import { kakaoUrlAtom } from '../../../atom/KakaoUrlAtom';
import { SyncLoader } from "react-spinners"

const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY; 

const SharePage = ({shareModal, canvasRef}) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;

  const [imageSrc, setImageSrc] = useState();
  const [text, setText] = useRecoilState(textareaAtom);
  const [kakaoUrl, setKakaoUrl] = useRecoilState(kakaoUrlAtom);
  // 로딩을 띄우기 위한 상태관리
  const [loading, setLoading] = useState(true)

  const onCapture = async () => {
    html2canvas(document.getElementById("newcanvas")).then(async (canvas) => {
      const croppedCanvas = document.createElement("canvas");
      const ctx = croppedCanvas.getContext("2d");

      // 집 모양의 중심 좌표
      const centerX = canvas.width / 2; // 집 모양의 중심 x 좌표를 여기에 입력
      const centerY = canvas.height / 2 -50; // 집 모양의 중심 y 좌표를 여기에 입력

      // 잘라낼 영역의 크기 설정
      const width = centerX * 1.8;
      const height = centerY * 1.1;

      // 중심 좌표를 기준으로 잘라낼 영역의 시작 좌표 계산
      const startX = centerX - width / 2;
      const startY = centerY - height / 2;

      croppedCanvas.width = width;
      croppedCanvas.height = height;

      // 원본 캔버스에서 잘라낼 영역만 croppedCanvas에 그리기
      ctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);

      // 카카오 서버에 이미지 던지기
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(JS_KEY);
      }

      function cropToSquare(canvas) {
        const context = canvas.getContext('2d');
      
        const width = canvas.width;
        const height = canvas.height;
        let newWidth, newHeight, offsetX, offsetY;
      
        // 이미지의 너비와 높이 중 작은 값을 기준으로 정사각형 
        if (width > height) {
          newWidth = height;
          newHeight = height;
          offsetX = (width - height) / 2;
          offsetY = 0;
        } else {
          newWidth = width;
          newHeight = width;
          offsetX = 0;
          offsetY = (height - width) / 2;
        }
      
        // 정사각형 크기의 새로운 Canvas 
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = newWidth;
        croppedCanvas.height = newHeight;
      
        // 새로운 Canvas에 이미지의 정사각형 부분 
        const croppedContext = croppedCanvas.getContext('2d');
        croppedContext.drawImage(canvas, offsetX, offsetY, newWidth, newHeight, 0, 0, newWidth, newHeight);
      
        return croppedCanvas;
      }   
      // 화면에 표시할 이미지를 위한 Blob 
      croppedCanvas.toBlob(function(blob) {
        var displayFile = new File([blob], "displayImage.png", {type: "image/png", lastModified: Date.now()});
        setImageSrc(URL.createObjectURL(displayFile));
        setLoading(false)
      }, "image/png");

      // 카카오 공유 기능을 위한 Blob  
      const saveCanvas = cropToSquare(croppedCanvas);
      saveCanvas.toBlob(function(blob) {
        var shareFile = new File([blob], "shareImage.png", {type: "image/png", lastModified: Date.now()});

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(shareFile);

        window.Kakao.Share.uploadImage({
          file: dataTransfer.files,
        })
        .then(function(response) {
          setKakaoUrl(response.infos.original.url);
        })
        .catch(function(error) {
          console.log(error);
        });

      }, "image/jpeg");

      // const uploadedImageUrl = await handleImageUpload(croppedCanvas);
      // setImageSrc(uploadedImageUrl);
      // setImageSrc(croppedCanvas.toDataURL("image/png"));
      // await handleImageUpload(croppedCanvas); 
    });
  };

  useEffect(()=>{
    onCapture();
  },[shareModal])

  return (
    <div className={styles.modalOverlay} id="shareModal">
      <div className={styles.modalContent}>
        {loading ? (
          <div className={styles.Loading}>
            <div style={{ marginBottom: "5px" }}>Loading...</div>
            <SyncLoader />
          </div>
        ) : (
          <img src={imageSrc} alt="Shared Content" />
        )}
        <h2>{formattedDate}</h2>
        <div>
          <textarea className={styles.textarea} placeholder="본인의 이야기를 작성해보세요!" spellCheck="false" maxLength={33} onChange={(e)=>{setText(e.target.value)}} style={{fontFamily: "GangwonEduAll-Light"}}/>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
