import React, { useEffect } from "react"
import resultInfo from "../../assets/json/result.json"
// import LogoEffect from "../assets/images/logo/logo_effect.png";
import SharingModalList from "../../components/Modal/Sharing/SharingModalList"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
// import { isLoginAtom } from "../atoms/userAtoms";

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
    <div>
      {/* <img src={LogoEffect} alt="test" className="w-full px-14 py-8" /> */}
      <div>
        <div>
          <div>
            <div>
              <p>당신의</p>
              <p>우표는?</p>
            </div>
            <div></div>
            <div>
              <hr />
              <p>공유하기</p>
              <SharingModalList />
              <div onClick={onTestHandler}>
                <p>다시 하기</p>
              </div>
            </div>
          </div>
          {/* <div className="w-2 h-2 rounded-xl border-2 border-hrtColorPink absolute left-1 top-1"></div>
            <div className="w-2 h-2 rounded-xl border-2 border-hrtColorPink absolute right-1 top-1"></div>
            <div className="w-2 h-2 rounded-xl border-2 border-hrtColorPink absolute left-1 bottom-1"></div>
            <div className="w-2 h-2 rounded-xl border-2 border-hrtColorPink absolute right-1 bottom-1"></div> */}
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default StampTestResult
