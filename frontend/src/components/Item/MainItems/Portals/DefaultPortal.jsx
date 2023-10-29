import React, { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  DefaultPosition,
  DefaultZoom,
} from "../../../../atom/DefaultSettingAtom"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"
import { ArriveAtom } from "../../../../atom/SinglePlayAtom"

const DefaultPortal = ({
  setConfirmEnteringLocation,
  portalPosition,
  setPortalVisible,
  adjustedAngle,
  adjustedZoom,
}) => {
  // Canvas 기본 세팅
  const setDefaultCamPosition = useSetRecoilState(DefaultPosition)
  const setDefaultZoom = useSetRecoilState(DefaultZoom)

  // 캐릭터 실시간 위치
  const characterPosition = useRecoilValue(CharacterPositionAtom)

  // 도착 후 움직임 제어
  const setIsArrived = useSetRecoilState(ArriveAtom)

  // 포탈
  const PortalSize = [0.5, 0.5]

  useEffect(() => {
    // 포탈 영역 내부에 있는지 확인
    const isInsideX =
      Math.abs(portalPosition[0] - characterPosition[0]) <= PortalSize[0] / 2
    const isInsideZ =
      Math.abs(portalPosition[2] - characterPosition[2]) <= PortalSize[1] / 2

    const isInside = isInsideX && isInsideZ

    if (isInside) {
      // 카메라 세팅
      setDefaultCamPosition(adjustedAngle)
      setDefaultZoom(adjustedZoom)

      // 캐릭터 움직임 제어
      setIsArrived(true)

      // 입장
      setConfirmEnteringLocation(true)
      setPortalVisible(false)
    } else {
      // 카메라 세팅 기본 값으로 초기화
      // setDefaultCamPosition([2, 10, 10])
      // setDefaultZoom(0.18)
      // 캐릭터 움직임
      // setIsArrived(false)
    }
  }, [characterPosition])
  console.log()

  return (
    <mesh position={portalPosition} rotation={[-Math.PI / 2, 0.01, 0]}>
      {/* 향후 포탈 3D 에셋으로 변경 예정 */}
      <planeGeometry args={PortalSize} />
      <meshStandardMaterial color={"yellow"} transparent opacity={0.5} />
    </mesh>
  )
}

export default DefaultPortal
