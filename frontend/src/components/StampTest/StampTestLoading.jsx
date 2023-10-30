import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const StampTestLoading = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (props.result === "IST") { //별
      navigate("/yourstamp/result?result=0")
    } else if (props.result === "ISF") { //네잎클로버
      navigate("/yourstamp/result?result=1")
    } else if (props.result === "INF") { //구름
      navigate("/yourstamp/result?result=2")
    } else if (props.result === "INT") { //퍼즐
      navigate("/yourstamp/result?result=3")
    } else if (props.result === "EST") { //번개
      navigate("/yourstamp/result?result=4")
    } else if (props.result === "ESF") { //꽃
      navigate("/yourstamp/result?result=5")
    } else if (props.result === "ENF") { //하트
      navigate("/yourstamp/result?result=6") 
    } else if (props.result === "ENT") { //로켓
      navigate("/yourstamp/result?result=7")
    } else {
      navigate("/yourstamp/result?result=0")
    }
  })

  return <div>분석중...</div>
}

export default StampTestLoading
