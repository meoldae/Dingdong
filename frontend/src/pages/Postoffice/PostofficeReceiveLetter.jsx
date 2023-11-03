import React, { useEffect, useState} from "react"
import SharingModalList from "@/components/Modal/Sharing/SharingModalList"
import { useNavigate, useParams } from "react-router-dom" 
import styles from "./PostofficeReceiveLetter.module.css" 
import Card from "../../components/UI/Card"
import { getLetterSNSDetail } from "../../api/Letter"; 

const PostofficeReceiveLetter = () => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL 
  const { letterId } = useParams(); 

  const [letterData, setLetterData] = useState(null);

  useEffect(() => { 
    getLetterSNSDetail(
      letterId,
      (response) => {
        console.log('Success:', response);
        setLetterData(response.data.data);   
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }, [letterId]); // letterId가 변경될 때마다 호출

  const onHomeHandler = (e) => {
    navigate(`${urlPath}/`)
  }
  const onRoomHandler = (e) => {
    navigate(`${urlPath}/invite/${letterData.roomId}`)
  } 

  return (
    <div className={styles.Container}>
      <div className={styles.PostImage}>
        <div className={styles.sendLetterContainer}>
          <Card className={styles.sendLetterBox}>
            <div className={styles.xmarkImg}></div>
            <img
              className={styles.topPostCardImg}
              src={letterData?.stampUrl ?? ""}
            />
            <div className={styles.ToUser}>
              To. {letterData?.letterTo ?? ""}
            </div>
            <div className={styles.letterContent}>
              {letterData?.description ?? ""}
            </div>
            <div className={styles.footerContainer}>
              <div className={styles.FromUser}>
                From. {letterData?.letterFrom ?? ""}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.Button} onClick={onRoomHandler}>{letterData?.letterFrom ??  ""}님의 방 방문하기</div>
        <div className={styles.Button} onClick={onHomeHandler}>딩동 시작하기</div>
      </div>
    </div>
  )
}

export default PostofficeReceiveLetter;
