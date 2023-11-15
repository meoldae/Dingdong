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
  PortalSize,
}) => {
  // Canvas 기본 세팅
  const setDefaultCamPosition = useSetRecoilState(DefaultPosition)
  const setDefaultZoom = useSetRecoilState(DefaultZoom)

  // 캐릭터 실시간 위치
  const characterPosition = useRecoilValue(CharacterPositionAtom)

  // 도착 후 움직임 제어
  const setIsArrived = useSetRecoilState(ArriveAtom)

  // 포탈
  // const PortalSize = [1, 1]

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
    }
  }, [characterPosition])

  return (
    <mesh position={portalPosition}>
      {/* 원하는 위치로 변경 가능 */}
      <cylinderGeometry
        args={[PortalSize[0] / 2, PortalSize[1] / 2, 0.2, 20]}
      />
      {/* args: [위 반지름, 아래 반지름, 높이, 방사형 세그먼트 수] */}
      <meshStandardMaterial color={"yellow"} />
    </mesh>
  )
}

export default DefaultPortal
