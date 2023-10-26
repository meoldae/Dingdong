import React, { useEffect } from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"
import { isHouseVisibleAtom } from "../../../../atom/HouseAtom"

const Spot = () => {
  const characterPosition = useRecoilValue(CharacterPositionAtom)
  const setIsHouseVisible = useSetRecoilState(isHouseVisibleAtom)

  // Spot 위치 및 크기 설정
  const SPOT_POSITION = [5, 0, 5]
  const SPOT_SIZE = [3, 3] // Spot의 크기

  useEffect(() => {
    // Spot 사각형 영역 내부에 있는지 확인
    const isInsideX =
      Math.abs(SPOT_POSITION[0] - characterPosition[0]) <= SPOT_SIZE[0] / 2
    const isInsideZ =
      Math.abs(SPOT_POSITION[2] - characterPosition[2]) <= SPOT_SIZE[1] / 2
    const isInside = isInsideX && isInsideZ

    setIsHouseVisible(isInside)
  }, [characterPosition])
  return (
    <mesh position={[5, 0.005, 5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial color={"yellow"} transparent opacity={0.5} />
    </mesh>
  )
}

export default Spot
