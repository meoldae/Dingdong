import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StampTestLoading = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (props.result === "IST") {
      navigate("/yourstamp/result?result=0")
    } else if (props.result === "ISF") {
      navigate("/yourstamp/result?result=1")
    } else if (props.result === "INF") {
      navigate("/yourstamp/result?result=2")
    } else if (props.result === "INT") {
      navigate("/yourstamp/result?result=3")
    } else if (props.result === "EST") {
      navigate("/yourstamp/result?result=4")
    } else if (props.result === "ESF") {
      navigate("/yourstamp/result?result=5")
    } else if (props.result === "ENF") {
      navigate("/yourstamp/result?result=6")
    } else if (props.result === "ENT") {
      navigate("/yourstamp/result?result=7")
    } else {
      navigate("/yourstamp/result?result=0")
    }
  })

  return <div>분석중...</div>
}

export default StampTestLoading
