import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SignUp.module.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { CreateUser, GetAvatarList } from "@/api/User"

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

  const NextArrow = ({ onClick }) => {
    return (
      <div className={style.arrow + " " + style.next} onClick={onClick}>
        ➡️
      </div>
    )
  }

  const PrevArrow = ({ onClick }) => {
    return (
      <div className={style.arrow + " " + style.prev} onClick={onClick}>
        ⬅️
      </div>
    )
  }
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  return (
    <div>
      <span style={{ color: "#F2CBE4" }}>프로필 </span>
      <span style={{ color: "#2C2C2C" }}>선택</span>

      <Slider {...settings}>
        {charactersImages.map((charImg, idx) => (
          <img
            key={idx}
            src={charImg}
            alt=""
            className={style.characterImage}
            onClick={() => setAvatar(charImg)}
          />
        ))}
      </Slider>

      <div>
        <div>닉네임: </div>
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
      </div>

      <div>
        <button onClick={doSignUp}>회원가입</button>
      </div>
    </div>
  )
}
export default SignUp
