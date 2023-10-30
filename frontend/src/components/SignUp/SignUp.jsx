import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SignUp.module.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { CreateUser, GetAvatarList, DoubleCheck } from "@/api/User"
import DefaultBtn from "../Button/Default/DefaultBtn"

const SignUp = () => {
  const navigate = useNavigate()

  const [charactersData, setCharactersData] = useState([])
  const [avatarId, setAvatar] = useState(null)
  const [nickname, setNickname] = useState("")

  useEffect(() => {
    GetAvatarList(
      (response) => {
        const avatarList = response.data.data.avatarList
        const formattedData = Object.keys(avatarList).map((key) => ({
          id: parseInt(key),
          glb: avatarList[key],
        }))

        setCharactersData(formattedData)
        setAvatar(formattedData[0].id)
      },
      (error) => {
        console.error("Error fetching avatars:", error)
      }
    )
  }, [])

  const charactersImages = charactersData.map((charData) => charData.glb)
  const memberId = new URLSearchParams(window.location.search).get("memberId")
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    afterChange: (current) => handleSlideChange(current),
  }

  const handleSlideChange = (index) => {
    setAvatar(charactersData[index].id)
  }

  async function doSignUp() {
    if (!avatarId || !nickname) {
      window.alert("캐릭터와 닉네임을 모두 선택해주세요")
      return
    }

    const param = { memberId, avatarId, nickname }

    await CreateUser(
      param,
      (response) => {
        const token = response.data.data.accessToken
        navigate(`/oauth2/redirect?token=${token}`)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const doubleCheckHandler = () => {
    DoubleCheck(
      nickname,
      (success) => {
        alert("사용 가능한 닉네임 입니다!")
      },
      (error) => {
        alert("이미 사용중인 닉네임 입니다!")
      }
    )
  }

  return (
    <div className={styles.Container}>
      <div className={styles.titleContainer}>
        <span style={{ color: "#F2CBE4" }}>프로필 </span>
        <span style={{ color: "#2C2C2C" }}>설정</span>
      </div>
      <div className={styles.characterContainer}>
        <Slider {...settings} className={styles.charactersImages}>
          {charactersImages.map((charImg, idx) => (
            <img
              className={styles.imgsize}
              key={idx}
              src={charImg}
              alt=""
              onClick={() => setAvatar(charImg)}
            />
          ))}
        </Slider>
      </div>
      <div className={styles.selectText}>
        <p>캐릭터를 옆으로 넘기며 선택해보세요!</p>
      </div>
      <div>
        <div className={styles.nicknameContainer}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            className={styles.nicknameInput}
            maxLength={7}
          />
          <div className={styles.doubleCheck} onClick={doubleCheckHandler}>
            중복확인
          </div>
        </div>
        <div className={styles.doSignUpContainer}>
          <DefaultBtn
            btnName={"입주하기"}
            onClick={doSignUp}
            color={"#FCC4D7"}
          />
        </div>
      </div>
    </div>
  )
}
export default SignUp
