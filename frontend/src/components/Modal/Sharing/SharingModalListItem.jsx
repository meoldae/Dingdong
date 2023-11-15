import React from 'react'
import styles from "./Share.module.css"
function SharingModalListItem(props) {
  return (
    <div className={styles.shareItem} onClick={props.click}>
      <img src={props.icon} className='w-10 mb-1'/>
      <p className={styles[props.color]}>{props.name}</p>
    </div>
  )
}

export default SharingModalListItem;
