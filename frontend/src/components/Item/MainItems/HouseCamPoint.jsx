import React, { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { ArriveAtom, HouseCamAtom } from "../../../atom/HouseCamAtom"
import { modelPositionAtom } from "../../../atom/PlayerAtom"
import { DefaultPosition, DefaultZoom } from "../../../atom/DefaultCamAtom"
import { RoomConfirmAtom } from "../../../atom/RoomConfirmAtom"
import { HousePointVisibleAtom } from "../../../atom/HousePointVisible"

function HouseCamPoint() {
  const [modelPosition, setModelPosition] = useRecoilState(modelPositionAtom)
  const [defaultCamPosition, setDefaultCamPosition] =
    useRecoilState(DefaultPosition)
  const setDefaultZoom = useSetRecoilState(DefaultZoom)
  const [isArrived, setIsArrived] = useRecoilState(ArriveAtom)
  const setRoomConfirmVisible = useSetRecoilState(RoomConfirmAtom)
  const point = useRecoilValue(HouseCamAtom)
  let pointSize = [0.5, 1]
  const targetPosition = [9, 4, 2]
  const tartgetZoom = 0.25

  const [housePointVisible, setHousePointVisible] = useRecoilState(
    HousePointVisibleAtom
  )

  useEffect(() => {
    // Spot 사각형 영역 내부에 있는지 확인
    const isInsideX = Math.abs(point[0] - modelPosition[0]) <= pointSize[0] / 2
    const isInsideZ = Math.abs(point[2] - modelPosition[2]) <= pointSize[1] / 2
    const isInside = isInsideX && isInsideZ
    if (isInside) {
      setDefaultCamPosition(targetPosition)
      setDefaultZoom(tartgetZoom)
      setIsArrived(true)
      setRoomConfirmVisible(true)
      setHousePointVisible(false)
    } else {
      setDefaultCamPosition([1, 5, 5])
      setDefaultZoom(0.17)
      setIsArrived(false)
      setRoomConfirmVisible(false)
    }
  }, [modelPosition])
  return (
    <mesh position={point} rotation={[-Math.PI / 2, 0.01, 0]}>
      <planeGeometry args={pointSize} />
      <meshStandardMaterial color={"yellow"} transparent opacity={0.5} />
    </mesh>
  )
}

export default HouseCamPoint
