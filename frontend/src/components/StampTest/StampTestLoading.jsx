import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const StampTestLoading = (props) => {
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  useEffect(() => {
    if (props.result === "IST") { //별
      navigate(`${urlPath}/yourstamp/result?result=0`)
    } else if (props.result === "ISF") { //네잎클로버
      navigate(`${urlPath}/yourstamp/result?result=1`)
    } else if (props.result === "INF") { //구름
      navigate(`${urlPath}/yourstamp/result?result=2`)
    } else if (props.result === "INT") { //퍼즐
      navigate(`${urlPath}/yourstamp/result?result=3`)
    } else if (props.result === "EST") { //번개
      navigate(`${urlPath}/yourstamp/result?result=4`)
    } else if (props.result === "ESF") { //꽃
      navigate(`${urlPath}/yourstamp/result?result=5`)
    } else if (props.result === "ENF") { //하트
      navigate(`${urlPath}/yourstamp/result?result=6`) 
    } else if (props.result === "ENT") { //로켓
      navigate(`${urlPath}/yourstamp/result?result=7`)
    } else {
      navigate(`${urlPath}/yourstamp/result?result=0`)
    }
  })

  return <div>분석중...</div>
}

export default StampTestLoading
