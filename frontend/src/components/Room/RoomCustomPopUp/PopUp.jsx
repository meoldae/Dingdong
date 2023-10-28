import styles from "./PopUp.module.css";
import PopUpContent from "./PopUpContent";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { popUpStatusAtom } from "../../../atom/RoomCustomTabAtom";

const PopUp = () => {

    const [tabStatus, setTabStatus] = useState(0);
    const setPopUpStatus = useSetRecoilState(popUpStatusAtom);

    const changeMenu = (image, menuIndex) =>{
        setTabStatus(menuIndex);
    }

    const popUpClose = () => {
        setPopUpStatus(false);
    }

    const roomCustomSave = () => {
        console.log("방 저장 함수 구현하세요 ");
    }

    const imagePath = '../../../../public/assets/images/roomCustom/';
    const images = ['all.png', 'furniture.png', 'carpets.png', 'wallHanging.png', 'props.png'];

    return (    
        <div className={styles.popUpContainer}>

            <div className={styles.popUpClose} onClick={() => popUpClose()}> 
                <img src="../../../../public/assets/icons/cross.svg" className={styles.closeVector} />
            </div>
            <div className={styles.customSaveButton} onClick={() => roomCustomSave() }> 
                <img src="../../../../public/assets/icons/save.svg" className={styles.customSaveVector} />
            </div>

            <ul className={styles.tabBar}>
            {images.map((image, index)=> (
                    <li
                        key={index}
                        className={`${tabStatus === index ? 'active' : ''}`}
                        onClick={() => changeMenu(image, index)}>
                            
                        <img src={imagePath + image} alt={`Image ${index + 1}`} 
                            style={{
                                height: '60%',
                                objectFit: 'cover'
                            }}
                        />
                    </li>
                    )
                )}
            </ul>
            
            <div className={styles.content}>
                <PopUpContent category={tabStatus}></PopUpContent>
            </div>
        </div>
    )   
}

export default PopUp