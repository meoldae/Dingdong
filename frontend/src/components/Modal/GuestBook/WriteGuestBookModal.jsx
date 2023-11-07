// 라이브러리
import { useState } from 'react'

// 스타일
import styles from './WriteGuestBookModal.module.css'

const WriteGuestBookModal = () => {
  // 방명록 작성 내용
  const [content, setContent] = useState("")
  // 방명록 작성 내용 길이
  const [contentLength, setContentLength] = useState(0)
  // 색상코드 상태관리
  const [isColor, setIsColor] = useState(0)

  // 방명록 작성 내용 함수
  const checkContentHandler = (event) => {
    setContent(event.target.value)
    setContentLength(event.target.value.length)
  }

  // 색상 아이템
  const colorList = [
    "linear-gradient(180deg, #FFFFFF 0%, #FF6E8A 100%)", // 0: 빨간색
    "linear-gradient(180deg, #FFFFFF 0%, #FF9E2C 100%)", // 1: 주황색
    "linear-gradient(180deg, #FFFFFF 0%, #FFC745 100%)", // 2: 노란색
    "linear-gradient(180deg, #FFFFFF 0%, #27D674 100%)", // 3: 초록색
    "linear-gradient(180deg, #FFFFFF 0%, #64B1FF 100%)", // 4: 파란색
    "linear-gradient(180deg, #FFFFFF 0%, #CB9DFF 100%)", // 5: 보라색
    "linear-gradient(180deg, #FFFFFF 0%, #696969 100%)", // 6: 검정색
  ]

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. 다영시치</div>
        <div className={styles.ContentContainer}>
          <textarea
            value={content}
            onChange={(e) => checkContentHandler(e)}
            placeholder='방명록을 남겨보세요!&#10;최대 100자까지 작성할 수 있습니다!'
            maxLength={99}
            spellCheck="false"
            style={{ fontFamily: "GangwonEduAll-Light", background: `${colorList[isColor]}` }}
          />
        </div>
        <div className={styles.ColorContainer}>
          <div className={styles.Colors}>
            {colorList.map((color, index) => (
              <div
                key={index}
                className={styles.ColorCircle}
                onClick={() => setIsColor(index)}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.Button} style={{ background: `${colorList[isColor]}` }}>방명록 남기기</div>
        </div>
      </div>
    </>
  )
}

export default WriteGuestBookModal