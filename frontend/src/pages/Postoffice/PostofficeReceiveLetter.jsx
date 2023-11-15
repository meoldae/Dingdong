// 라이브러리
import React, { useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom" 

// 스타일
import styles from "./PostofficeReceiveLetter.module.css" 

// 컴포넌트
import Card from "../../components/UI/Card"

// API
import { getLetterSNSDetail } from "../../api/Letter"; 

const PostofficeReceiveLetter = () => {
  // 라우터 함수
  const navigate = useNavigate()

  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 편지 ID
  const { letterId } = useParams(); 

  // 상태관리
  const [letterData, setLetterData] = useState(null);
  const [letterStamp, setLetterStamp] = useState(null);

  // SNS 편지 상세 정보
  useEffect(() => { 
    getLetterSNSDetail(
      letterId,
      (response) => {
        setLetterData(response.data.data); 
        setLetterStamp(response.data.data.stampUrl.split("/").pop().split('.')[0]);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }, [letterId]); // letterId가 변경될 때마다 호출

  // 메인페이지 이동
  const onHomeHandler = () => {
    navigate(`${urlPath}/`)
  }

  // 초대 방으로 이동
  const onRoomHandler = () => {
    navigate(`${urlPath}/invite/${letterData.roomId}`)
  } 

  return (
    <div className={`${styles.Container} ${styles[letterStamp]}`} style={{ fontFamily: "GangwonEduAll-Light" }}>
      <div className={styles.PostImage}>
        <div className={`${styles.sendLetterContainer} `}>
          <Card className={styles.sendLetterBox}>
            <div className={styles.xmarkImg}></div>
            <img className={styles.poststampFrame}
                  src={`${urlPath}/assets/images/poststamp_frame.png`}
              />  
            <img
              className={styles.topPostCardImg}
              src={`${urlPath}/assets/images/post/${letterStamp}.png`}
            />
            <div className={styles.ToUser} style={{ fontFamily: "GangwonEduAll-Light" }}>
              To. {letterData?.letterTo ?? ""}
            </div>
            <div className={styles.letterContent}>
              <span style={{ whiteSpace: 'normal', wordWrap: 'break-word', width: '310px' }} dangerouslySetInnerHTML={{ __html: letterData?.description.replaceAll('\n', '<br />') }} />
            </div>
            <div className={styles.footerContainer} style={{ fontFamily: "GangwonEduAll-Light" }}>
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
