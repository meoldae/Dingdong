import React, { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  DefaultPosition,
  DefaultZoom,
} from "../../../../atom/DefaultSettingAtom"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"
import {
  ArriveAtom,
  ConfirmEnteringRoomAtom,
  RoomPortalVisibleAtom,
  RoomPortalPositionAtom,
} from "../../../../atom/SinglePlayAtom"

const RoomPortal = () => {
  // Canvas 기본 세팅
  const setDefaultCamPosition = useSetRecoilState(DefaultPosition)
  const setDefaultZoom = useSetRecoilState(DefaultZoom)

  // 캐릭터 실시간 위치
  const characterPosition = useRecoilValue(CharacterPositionAtom)

  // 도착 후 움직임 제어
  const setIsArrived = useSetRecoilState(ArriveAtom)

  // 입장 모달
  const setConfirmEnteringHouse = useSetRecoilState(ConfirmEnteringRoomAtom)

  // 포탈
  const roomPortalPosition = useRecoilValue(RoomPortalPositionAtom)
  const roomPortalSize = [0.5, 0.5]
  const setRoomPortalVisible = useSetRecoilState(RoomPortalVisibleAtom)

  // 카메라 각도 조절
  const adjustedAngle = [16, 5, 1]
  const adjustedZoom = 0.24

  useEffect(() => {
    // 포탈 영역 내부에 있는지 확인
    const isInsideX =
      Math.abs(roomPortalPosition[0] - characterPosition[0]) <=
      roomPortalSize[0] / 2
    const isInsideZ =
      Math.abs(roomPortalPosition[2] - characterPosition[2]) <=
      roomPortalSize[1] / 2

    const isInside = isInsideX && isInsideZ

    if (isInside) {
      // 카메라 세팅
      setDefaultCamPosition(adjustedAngle)
      setDefaultZoom(adjustedZoom)

      // 캐릭터 움직임 제어
      setIsArrived(true)

      // 입장
      setConfirmEnteringHouse(true)
      setRoomPortalVisible(false)
    } else {
      // 카메라 세팅 기본 값으로 초기화
      setDefaultCamPosition([2, 10, 10])
      setDefaultZoom(0.18)

      // 캐릭터 움직임
      setIsArrived(false)

      // 강제 커서 이동 대비
      setConfirmEnteringHouse(false)
    }
  }, [characterPosition])

  return (
    <mesh position={roomPortalPosition} rotation={[-Math.PI / 2, 0.01, 0]}>
      {/* 향후 포탈 3D 에셋으로 변경 예정 */}
      <planeGeometry args={roomPortalSize} />
      <meshStandardMaterial color={"yellow"} transparent opacity={0.5} />
    </mesh>
  )
}

export default RoomPortal
