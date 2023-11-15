import React, { useEffect, useState } from "react"
import Questions from "./questions.json"
import styles from "./StampTestOptions.module.css"

const StampTestOptions = (props) => {
  const [opsNum, setOpsNum] = useState(0)
  const [MBTI, setMBTI] = useState(["A"])
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const onNextHandler = (e) => {
    const optionType = e.currentTarget.id
    const newMBTI = [...MBTI]
    newMBTI.push(optionType)
    setMBTI(newMBTI)
    if (opsNum >= Questions.length - 1) {
      let e = 0,
        n = 0,
        f = 0,
        j = 0
      for (let i = 0; i < 9; i++) {
        if (newMBTI[i] === "E") {
          e++
        } else if (newMBTI[i] === "N") {
          n++
        } else if (newMBTI[i] === "F") {
          f++
        }
      }
      let result = [e >= 2 ? "E" : "I", n >= 2 ? "N" : "S", f >= 2 ? "F" : "T"]
      let resultStr = result.join("")
      props.setResult(resultStr)
      props.setTestMode("result")
    }
    setOpsNum(opsNum + 1)
  }

  return (
    <div className={styles.Container}>
      <img
        src={`${urlPath}/assets/images/Stamp_Test_Option.png`} 
        style={{ marginTop: "10%", width: "60%",}}
      />
      <div className={styles.ContentContainer}>
        <div className={styles.Question}>{Questions[opsNum].question}</div>
        <div className={styles.AnswerContainer}>
          {Questions[opsNum].answers.map((answer) => {
            return (
              <div
                key={answer.id}
                id={answer.type}
                onClick={onNextHandler}
                className={styles.Answer}
              >
                {answer.content}
              </div>
            )
          })}
        </div>
        <div className={styles.FooterNumber}>{opsNum + 1}/9</div>
      </div>
    </div>
  )
}

export default StampTestOptions
