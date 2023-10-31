import RoomBtn from "../Button/Room/RoomBtn"
import PostBox from "../Modal/Post/PostBox"
import ReceiveLetter from "../Modal/Post/ReceiveLetter"
import style from "./Footer.module.css"
import { useRecoilState } from "recoil"
import { isPostBoxVisibleAtom, isReceiveLetterVisibleAtom } from "../../atom/PostAtom"
import { popUpStatusAtom } from "../../atom/RoomCustomTabAtom"
import { ItemsState, buildModeState } from "../Room/Atom"
import { useNavigate } from "react-router-dom"

const MyFooter = () => {
  const [editMode,setEditMode] = useRecoilState(buildModeState);
  const [items,setItems] = useRecoilState(ItemsState);
  const [isPostBoxVisible, setIsPostBoxVisible] =
    useRecoilState(isPostBoxVisibleAtom)
  const [isReceiveLetterVisible, setIsReceiveLetterVisible] = useRecoilState(
    isReceiveLetterVisibleAtom
  )
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom);
  
  const handleSelectButtonClick = () => {
    console.log(1)
  }
  const roomEditClickEvent = () =>{
    setItems(items);
    setPopUpStatus(!popUpStatus);
    setEditMode(true);
  }
  const goSingleMap= () =>{
    window.location.replace("/single")
  }
  return (
    <div className={style.wrap}>
      <div className={style.secondFooter}>
        <div className={style.background}>
          <RoomBtn img={"roomEdit"} onClick={() =>roomEditClickEvent()} />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.background}>
          <RoomBtn img={"worldMap"} onClick={()=>{goSingleMap()}}/>
        </div>
        <div className={style.background}>
          <RoomBtn img={"postBox"} onClick={() => setIsPostBoxVisible(true)} />
        </div>
      </div>
      {isPostBoxVisible && (
        <PostBox cancelClick={() => setIsPostBoxVisible(false)} onSelectButtonClick={handleSelectButtonClick}/>
      )}
      {isReceiveLetterVisible && (
        <ReceiveLetter cancelClick={() => setIsReceiveLetterVisible(false)} />
      )}
    </div>
  )
}

export default MyFooter
