import React, { useRef, useCallback } from "react";
import style from "./ProfileSelect.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DefaultBtn from "../../components/Button/Default/DefaultBtn";
const ProfileSelect = () => {
  const root = "assets/characters/";
  const character = [
    {
      id: 1,
      glb: `${root}female1.png`,
      name: "딩동이",
    },
    {
      id: 2,
      glb: `${root}female2.png`,
      name: "DP",
    },
    {
      id: 3,
      glb: `${root}female3.png`,
      name: "뭉치",
    },
    {
      id: 4,
      glb: `${root}male3.png`,
      name: "딩동이",
    },
    {
      id: 5,
      glb: `${root}male4.png`,
      name: "DP",
    },
    {
      id: 6,
      glb: `${root}male5.png`,
      name: "뭉치",
    },
  ];

  const slickRef = useRef(null);

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <div className={style.profile}>프로필</div>
        <div>선택</div>
      </div>

      <div className={style.slider}>
        {/* <div onClick={previous} className={style.leftArrow}>
          <img src={"assets/icons/leftArrow.svg"} alt={"pre-arrow"} />
        </div> */}
        <div>
          <Slider {...settings} ref={slickRef}>
            {character.map((item) => (
              <div key={item.id} className={style.map}>
                <div className={style.sliderInside}>
                  <img src={item.glb} alt="" />
                  <div className={style.name}>{item.name}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* <div onClick={next} className={style.rightArrow}>
          <img src={"assets/icons/rightArrow.svg"} alt={"next-arrow"} />
        </div> */}
      </div>

      <div className={style.btn}>
        <DefaultBtn btnName={"입주하기"} color={"#049463"} />
      </div>
    </div>
  );
};

export default ProfileSelect;
