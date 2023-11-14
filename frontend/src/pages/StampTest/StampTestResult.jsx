import React, { useEffect} from "react"
import Results from "./result.json" 
import SharingModalList from "@/components/Modal/Sharing/SharingModalList"
import { useNavigate } from "react-router-dom" 
import styles from "./StampTestResult.module.css" 

const StampTestResult = () => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // const isLogin = useRecoilValue(isLoginAtom);

  let params = new URL(document.URL).searchParams
  let result = params.get("result")

  const resultIndex = Number(result)

  const onHomeHandler = (e) => {
    window.location.replace(`${urlPath}/`)
  }
  const onTestHandler = (e) => {
    navigate(`${urlPath}/yourstamp`)
  }

  useEffect(() => {
    if (!result || ![0, 1, 2, 3, 4, 5, 6, 7].includes(resultIndex)) {
      navigate(`${urlPath}/notfound`);
    }
  }, [navigate, result, resultIndex]);
 
  const resultSrcUrl = `${urlPath}/assets/StampTest/` + Results[resultIndex]?.srcUrl;
 
  if (!result || ![0, 1, 2, 3, 4, 5, 6, 7].includes(resultIndex)) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.PostImage}>
        <img className={styles.PostImagePng}
            src={resultSrcUrl}  alt={resultSrcUrl}
        />
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.Button} onClick={onTestHandler}>테스트 다시하기</div>
        <div className={styles.Button} onClick={onHomeHandler}>딩동 시작하기</div>
      </div>
      <SharingModalList shareMode={"result"} resultSrcUrl={resultSrcUrl} />
    </div>
  )
}

export default StampTestResult
