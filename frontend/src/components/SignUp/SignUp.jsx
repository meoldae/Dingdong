import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CreateUser, GetAvatarList, DoubleCheck } from "@/api/User";
import DefaultBtn from "../Button/Default/DefaultBtn";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/atom/UserAtom";
import { successMsg } from "../../utils/customToast";
import "./signUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const setLoginInfo = useSetRecoilState(userAtom);

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;

  const [charactersData, setCharactersData] = useState([]);
  const [avatarId, setAvatar] = useState(1);
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [slideCheck, setSlideCheck] = useState(true);
  useEffect(() => {
    GetAvatarList(
      (response) => {
        const avatarList = response.data.data.avatarList;
        const formattedData = Object.keys(avatarList).map((key) => ({
          id: parseInt(key),
          glb: avatarList[key],
        }));

        setCharactersData(formattedData);
        setAvatar(formattedData[0].id);
      },
      (error) => {
        console.error("Error fetching avatars:", error);
      }
    );
  }, []);

  const handleSlideChange = (index) => {
    setAvatar(charactersData[index].id);
  };

  const charactersImages = charactersData.map((charData) => charData.glb);
  const memberId = new URLSearchParams(window.location.search).get("memberId");
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    prevArrow: <img src={`${urlPath}/assets/icons/leftArrow.png`} />,
    nextArrow: <img src={`${urlPath}/assets/icons/rightArrow.png`} />,
    afterChange: handleSlideChange,
  };

  

  async function doSignUp() {
    if (!avatarId || !nickname) {
      successMsg("⛔ 캐릭터와 닉네임을 모두 선택해주세요");
      return;
    }
    if (!isValid) {
      successMsg("⛔ 닉네임 중복확인을 해주세요!");
      return;
    }

    const param = { memberId, avatarId, nickname };

    await CreateUser(
      param,
      (response) => {
        const token = response.data.data.accessToken;
        const avatarId = response.data.data.avatarId;
        const nickname = response.data.data.nickname;
        const roomId = response.data.data.roomId;

        setLoginInfo((prevState) => ({
          ...prevState,
          accessToken: token,
          avatarId: avatarId,
          nickname: nickname,
          roomId: roomId,
        }));

        navigate(`${urlPath}/`);
      },
      (error) => {
        console.log("입주에 실패했습니다");
      }
    );
  }

  const doubleCheckHandler = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 5) {
      setNickname(e.target.value);
    }
  };

  useEffect(() => {
    if (nickname === "") {
      setIsValid(false);
      setNicknameMessage("닉네임을 입력해주세요");
      return;
    } else if (nickname.length > 5) {
      setIsValid(false);
      setNicknameMessage("닉네임은 5글자 이하로 입력해주세요");
      return;
    } else if (!/^[a-zA-Z0-9가-힣\s]*$/.test(nickname)) {
      setIsValid(false);
      setNicknameMessage("올바른 닉네임을 입력해주세요");
      return;
    }

    DoubleCheck(nickname, (success) => {
      if (success.data.code === "FAILED") {
        setIsValid(false);
        setNicknameMessage("이미 사용중인 닉네임 입니다!");
      } else {
        setIsValid(true);
        setNicknameMessage("사용 가능한 닉네임 입니다!");
      }
    });
  }, [nickname]);


  return (
    <div className={styles.Container}>
      <div className={styles.titleContainer}>
        <span style={{ color: "#049463" }}>프로필 </span>
        <span style={{ color: "#2C2C2C" }}>설정</span>
      </div>

      <div className={styles.characterContainer} onMouseDown={()=>setSlideCheck(false)}>
        <Slider {...settings}>
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
        {slideCheck && (
          <div className={styles.imgCheck}>
            <img src={`${urlPath}/assets/icons/slideleftright.gif`} alt="" />
          </div>
        )}
      </div>
      {isValid ? (
        <div className={styles.alertMessageSuccess}>
          <span>{nicknameMessage}</span>
        </div>
      ) : (
        <div className={styles.alertMessageError}>
          <span>{nicknameMessage}</span>
        </div>
      )}

      <div>
        {isValid ? (
          <div className={styles.nicknameContainer}>
            <input
              type="text"
              value={nickname.trim()}
              onChange={(e) => doubleCheckHandler(e)}
              placeholder=""
              className={styles.nicknameInputSuccess}
              maxLength={5}
              style={{ fontFamily: "GmarketSansMedium" }}
            />

            <img src={`${urlPath}/assets/icons/success.png`} />
          </div>
        ) : (
          <div className={styles.nicknameContainer}>
            <input
              type="text"
              value={nickname.trim()}
              onChange={(e) => doubleCheckHandler(e)}
              placeholder=""
              className={styles.nicknameInputError}
              maxLength={6}
            />
            <img src={`${urlPath}/assets/icons/error.png`} />
          </div>
        )}

        <div className={styles.doSignUpContainer}>
          <DefaultBtn
            btnName={"입주하기"}
            onClick={doSignUp}
            color={"#02C26F"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
