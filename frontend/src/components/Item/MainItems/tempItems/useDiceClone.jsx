import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three-stdlib"

const useDiceClone = (url) => {
  const { scene } = useGLTF(url)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  return clone
}

export default useDiceClone
