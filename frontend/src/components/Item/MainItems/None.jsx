import { useRecoilValue, useSetRecoilState } from "recoil"
import { HouseCamAtom } from "../../../atom/HouseCamAtom"
import { modelPositionAtom } from "../../../atom/PlayerAtom"
import { useEffect } from "react"
import { HousePointVisibleAtom } from "../../../atom/HousePointVisible"

function None() {
  const HousePoint = useRecoilValue(HouseCamAtom)
  const boundaryWidth = 1.5 // 테두리 영역의 너비
  const boundaryHeight = 0.7 // 테두리 영역의 높이
  const modelPosition = useRecoilValue(modelPositionAtom)
  const setHousePointVisible = useSetRecoilState(HousePointVisibleAtom)

  useEffect(() => {
    // Spot 사각형 영역 내부에 있는지 확인
    const isOutSideX =
      Math.abs(modelPosition[0] - HousePoint[0]) > boundaryWidth / 2
    const isOutSideZ =
      Math.abs(modelPosition[2] - HousePoint[2]) > boundaryHeight / 2
    const isOutSide = isOutSideX || isOutSideZ
    if (isOutSide) {
      setHousePointVisible(true)
    }
  }, [modelPosition])
  // console.log(modelPosition)
  return (
    <mesh position={HousePoint} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[boundaryHeight, boundaryWidth, 32]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

export default None
