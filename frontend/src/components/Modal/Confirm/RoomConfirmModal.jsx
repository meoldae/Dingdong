import { useRecoilState, useSetRecoilState } from "recoil"
import DefaultModal from "../Default/DefaultModal"
import { RoomConfirmAtom } from "../../../atom/RoomConfirmAtom"
import { modelPositionAtom } from "../../../atom/PlayerAtom"
import { ArriveAtom } from "../../../atom/HouseCamAtom"
import { useEffect } from "react"
import { DefaultPosition, DefaultZoom } from "../../../atom/DefaultCamAtom"

const RoomConfirmModal = () => {
  const [isConfrim, setIsConfirm] = useRecoilState(RoomConfirmAtom)
  const [modelPosition, setModelPosition] = useRecoilState(modelPositionAtom)
  const [isArrived, setIsArrived] = useRecoilState(ArriveAtom)

  const setDefaultCamPosition = useSetRecoilState(DefaultPosition)
  const setDefaultZoom = useSetRecoilState(DefaultZoom)

  const enterRoom = () => {
    setIsConfirm(false)
  }

  const onCancle = () => {
    setIsConfirm(false)
    setIsArrived(false)
    setDefaultCamPosition([1, 5, 5])
    setDefaultZoom(0.17)
  }

  return (
    <DefaultModal
      content={"마이룸으로 이동 하시겠습니까?"}
      ok={"확인"}
      cancel={"취소"}
      cancelClick={onCancle}
      okClick={enterRoom}
    />
  )
}

export default RoomConfirmModal
