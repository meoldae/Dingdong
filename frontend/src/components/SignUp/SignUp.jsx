import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SignUp.module.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { CreateUser, GetAvatarList, DoubleCheck } from "@/api/User"
import DefaultBtn from "../Button/Default/DefaultBtn"
import { useSetRecoilState } from "recoil"
import { userAtom } from "@/atom/UserAtom"
import { successMsg } from "../../utils/customToast"

const SignUp = () => {
  const navigate = useNavigate()
  const setLoginInfo = useSetRecoilState(userAtom)

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const [charactersData, setCharactersData] = useState([])
  const [avatarId, setAvatar] = useState(null)
  const [nickname, setNickname] = useState("")
  const [isValid, setIsValid] = useState(false)

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
      successMsg("⛔ 캐릭터와 닉네임을 모두 선택해주세요")
      return
    }
    if (!isValid) {
      successMsg("⛔ 닉네임 중복확인을 해주세요!")
      return
    }

    const param = { memberId, avatarId, nickname }

    await CreateUser(
      param,
      (response) => {
        const token = response.data.data.accessToken
        const avatarId = response.data.data.avatarId
        const nickname = response.data.data.nickname
        const roomId = response.data.data.roomId

        setLoginInfo((prevState) => ({
          ...prevState,
          accessToken: token,
          avatarId: avatarId,
          nickname: nickname,
          roomId: roomId,
        }))

        navigate(`${urlPath}/`)
      },
      (error) => {
        console.log("입주에 실패했습니다")
      }
    )
  }

  const doubleCheckHandler = () => {
    if (nickname === "") {
      setIsValid(false)
      successMsg("⛔ 닉네임을 입력해주세요")
      return
    } else if (nickname.length > 5) {
      setIsValid(false)
      successMsg("⛔ 닉네임은 5글자 이하로 입력해주세요")
    } else if (!/^[a-zA-Z0-9가-힣\s]*$/.test(nickname)) {
      setIsValid(false)
      successMsg("⛔ 올바른 닉네임을 입력해주세요")
      return
    }

    DoubleCheck(
      nickname,
      (success) => {
        setIsValid(true)
        successMsg("✅ 사용 가능한 닉네임 입니다!")
      },
      (error) => {
        setIsValid(false)
        successMsg("❌ 이미 사용중인 닉네임 입니다!")
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

      <p className={styles.selectText}>캐릭터를 옆으로 넘기며 선택해보세요!</p>

      <div>
        <div className={styles.nicknameContainer}>
          <input
            type="text"
            value={nickname.trim()}
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
