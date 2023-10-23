import React, { useEffect } from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { modelPositionAtom } from "../../../atom/PlayerAtom"
import { isHouseVisibleAtom } from "../../../atom/HouseAtom"

function Spot() {
  const modelPosition = useRecoilValue(modelPositionAtom)
  const setIsHouseVisible = useSetRecoilState(isHouseVisibleAtom)

  // Spot 위치 및 크기 설정
  const SPOT_POSITION = [5, 0, 5]
  const SPOT_SIZE = [3, 3] // Spot의 크기

  useEffect(() => {
    // Spot 사각형 영역 내부에 있는지 확인
    const isInsideX =
      Math.abs(SPOT_POSITION[0] - modelPosition[0]) <= SPOT_SIZE[0] / 2
    const isInsideZ =
      Math.abs(SPOT_POSITION[2] - modelPosition[2]) <= SPOT_SIZE[1] / 2
    const isInside = isInsideX && isInsideZ

    setIsHouseVisible(isInside)
  }, [modelPosition])
  return (
    <mesh position={[5, 0.005, 5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial color={"yellow"} transparent opacity={0.5} />
    </mesh>
  )
}

export default Spot
