import React, { useEffect } from "react"
import resultInfo from "../../assets/json/result.json"
// import LogoEffect from "../assets/images/logo/logo_effect.png";
import SharingModalList from "../../components/Modal/Sharing/SharingModalList"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
// import { isLoginAtom } from "../atoms/userAtoms";
import styles from "./StampTestResult.module.css"

const StampTestResult = () => {
  const navigate = useNavigate()

  // const isLogin = useRecoilValue(isLoginAtom);

  let params = new URL(document.URL).searchParams
  let result = params.get("result")
  const resultIndex = Number(result)

  const onHomeHandler = (e) => {
    navigate("/")
  }
  const onTestHandler = (e) => {
    navigate("/yourstamp")
  }

  useEffect(() => {
    if (!result || resultIndex > 8) {
      navigate("/notfound")
    }
  }, [])

  return (
    <div className={styles.Container}>
      <SharingModalList />
    </div>
  )
}

export default StampTestResult
