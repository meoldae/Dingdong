import React, { useEffect} from "react"
import SharingModalList from "@/components/Modal/Sharing/SharingModalList"
import { useNavigate } from "react-router-dom" 
import styles from "./PostofficeReceiveLetter.module.css" 
import Card from "../../components/UI/Card"
const PostofficeReceiveLetter = () => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  // const isLogin = useRecoilValue(isLoginAtom);

  let params = new URL(document.URL).searchParams
  let result = params.get("result")

  const resultIndex = Number(result)

  const onHomeHandler = (e) => {
    navigate(`${urlPath}/`)
  }
  const onTestHandler = (e) => {
    navigate(`${urlPath}/yourstamp`)
  }

 

  return (
    <div className={styles.Container}>
      <div className={styles.PostImage}>
      <div className={styles.sendLetterContainer}>
          <Card className={styles.sendLetterBox}>
            <div
              className={styles.xmarkImg}
            >
            </div>
            <img
              className={styles.topPostCardImg}
              src={`${urlPath}/assets/images/post/clover.png`}
            />
            <div className={styles.ToUser}>
              To.
              
            </div>
            <div className={styles.letterContent}>
            
            </div>
            <div className={styles.footerContainer}>
              <div className={styles.FromUser}>
                From.
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.Button} onClick={onHomeHandler}>{}이네 집 방문하기</div>
        <div className={styles.Button} onClick={onTestHandler}>딩동 시작하기</div>
      </div>
       
    </div>
  )
}

export default PostofficeReceiveLetter;
