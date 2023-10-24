import React from "react";
import style from "./ProfileSelect.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfileSelect = () => {
  const character = [
    {
      id: 1,
      glb: "hi",
      name: "딩동이",
    },
    {
      id: 2,
      glb: "ㅋㅋ",
      name: "DP",
    },
    {
      id: 3,
      glb: "ㅎㅎ",
      name: "뭉치",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div >
      <div className={style.header}>
        <div className={style.profile}>프로필</div>
        <div>선택</div>
      </div>

      <div className={style.slider}>
        <Slider {...settings}>
          {character.map((item) => (
            <div key={item.id} className={style.map}>
              <div>{item.glb}</div>
              <div>{item.name}</div>
            </div>
          ))}
        </Slider>
      </div>
      <div>button</div>
    </div>
  );
};

export default ProfileSelect;
