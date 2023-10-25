import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CreateUser } from "@/api/User";

const SignUp = () => {
    const navigate = useNavigate(); 
    const root = "assets/characters/";
    const charactersData = [
        {
            id: 1,
            glb: `${root}female1.png`,
        },
        {
            id: 2,
            glb: `${root}female2.png`,
        },
        {
            id: 3,
            glb: `${root}female3.png`,
        },
        {
            id: 4,
            glb: `${root}male3.png`,
        },
        {
            id: 5,
            glb: `${root}male4.png`,
        },
        {
            id: 6,
            glb: `${root}male5.png`,
        },
    ];

    const [avatarId, setAvatar] = useState(charactersData[0].id);
    const [nickname, setNickname] = useState("");
    const charactersImages = charactersData.map(charData => charData.glb);
    const memberId = new URLSearchParams(window.location.search).get("memberId");

    const NextArrow = ({ onClick }) => {
        return (
            <div className="arrow next" onClick={onClick}>
                    ➡️
                </div>
            );
        };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev" onClick={onClick}>
                ⬅️
            </div>
        );
    };
    const settings = {
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        afterChange: current => handleSlideChange(current)
    };

    const handleSlideChange = (index) => {
        setAvatar(charactersData[index].id);
    };

    async function doSignUp() {
        if (!avatarId || !nickname) {
            window.alert("캐릭터와 닉네임을 모두 선택해주세요");
            return;
        }
        
        const param = { memberId, avatarId, nickname };

        await CreateUser(param, (response) => {
            navigate("/");
        }, (error) => {console.log(error)});
    }

    return (
        <div>
            <div>
                <span style={{ color: "#049463" }}>프로필 </span>
                <span style={{ color: "#2C2C2C" }}>선택</span>

                <Slider {...settings}>
                    {charactersImages.map((charImg, idx) => (
                        <img key={idx} src={charImg} alt="" onClick={() => setAvatar(charImg)} />
                    ))}
                </Slider>

                <div>
                    <div>닉네임: </div>
                    <div>
                        <input type="text" 
                               value={nickname} 
                               onChange={(e) => setNickname(e.target.value)} 
                               placeholder="닉네임을 입력해주세요" />
                    </div>
                </div>

                <div>
                    <button onClick={doSignUp}>회원가입</button>
                </div>
            </div>
        </div>
    )
}
export default SignUp;