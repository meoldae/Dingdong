import styles from "./PopUp.module.css";
import PopUpContent from "./PopUpContent";
import React, { useState } from "react";

const PopUp = () => {

    const [tabStatus, setTabStatus] = useState(0);
    
    const changeMenu = (image, menuIndex) =>{
        setTabStatus(menuIndex);
    }

    const imagePath = '../../../../public/assets/images/roomCustom/';
    const images = ['all.png', 'furniture.png', 'carpets.png', 'wallHanging.png', 'props.png'];

    return (    
        <div className={styles.popUpContainer}>
            <ul className={styles.tabBar}>
            {images.map((image, index)=> (
                    <li
                        key={index}
                        className={`${tabStatus === index ? 'active' : ''}`}
                        onClick={() => changeMenu(image, index)}>
                            
                        <img src={imagePath + image} alt={`Image ${index + 1}`} 
                            style={{
                                height: '70%',
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