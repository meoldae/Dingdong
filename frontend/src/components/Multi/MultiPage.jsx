import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import { useSetRecoilState } from "recoil"
import { actionState } from "../../atom/MultiAtom"

export const MultiPage = () => {
  const setActionState = useSetRecoilState(actionState)
  const playAction = () => {
    setActionState(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionsBtn} onClick={playAction}>
        Button
      </div>
      <Canvas shadows camera={{ position: [2, 8, 15], fov: 30 }}>
        <MultiRender />
      </Canvas>
    </div>
  )
}
