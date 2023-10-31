import React, { useEffect } from "react"
import resultInfo from "@/assets/json/result.json" 
import SharingModalList from "@/components/Modal/Sharing/SharingModalList"
import { useNavigate } from "react-router-dom" 
import styles from "./StampTestResult.module.css"
import Results from "../../assets/json/result.json"

const StampTestResult = () => {
  const navigate = useNavigate()

  // const isLogin = useRecoilValue(isLoginAtom);

  let params = new URL(document.URL).searchParams
  let result = params.get("result")

  const resultIndex = Number(result)
  
  const resultSrcUrl = Results[resultIndex].srcUrl;   
 

  const onHomeHandler = (e) => {
    navigate("/")
  }
  const onTestHandler = (e) => {
    navigate("/yourstamp")
  }
  
  useEffect(() => {
    if (!result || ![0, 1, 2, 3, 4, 5, 6, 7].includes(resultIndex)) {
      navigate("/notfound")
    }
  }, [])

  return (
    <div className={styles.Container}>
      <div className={styles.PostImage}>
        <img className={styles.PostImagePng}
            src={resultSrcUrl} alt={resultSrcUrl}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.Button} onClick={onHomeHandler}>나의 우표로 편지 남기기</div>
        <div className={styles.Button} onClick={onTestHandler}>우표 테스트 다시하기</div>
      </div>
      <SharingModalList shareMode={"result"} resultSrcUrl={resultSrcUrl} />
    </div>
  )
}

export default StampTestResult
