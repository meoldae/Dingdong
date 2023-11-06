import React, { useEffect, useState } from "react"
import StampTestOptions from "@/components/StampTest/StampTestOptions"
import StampTestStart from "@/components/StampTest/StampTestStart"
import StampTestLoading from "@/components/StampTest/StampTestLoading"
import { useNavigate } from "react-router-dom"
import history from "../../components/UI/history"

const StampTest = () => {
  // 브라우저 뒤로가기 버튼 처리
  const [locationKeys, setLocationKeys] = useState([])
  const navigate = useNavigate()
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key])
        window.location.replace(`${urlPath}/`)
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys)
          window.location.replace(`${urlPath}/`)
        } else {
          setLocationKeys((keys) => [location.key, ...keys])
        }
      }
    })
  }, [locationKeys, history])

  const [testMode, setTestMode] = useState("start")
  const [result, setResult] = useState("")

  const onTestModeHanlder = (e) => {
    setTestMode("test")
  }

  return (
    <>
      {(function () {
        if (testMode === "start") {
          return <StampTestStart onTestModeHanlder={onTestModeHanlder} />
        } else if (testMode === "test") {
          return (
            <StampTestOptions setTestMode={setTestMode} setResult={setResult} />
          )
        } else {
          return <StampTestLoading result={result} />
        }
      })()}
    </>
  )
}

export default StampTest
