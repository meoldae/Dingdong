import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import { useRef } from "react"

export const MultiPage = () => {
  const multiRenderRef = useRef()

  const handleButtonClick = (action) => {
    if (multiRenderRef.current?.publishActions) {
      multiRenderRef.current.publishActions(action)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.BtnList}>
        <div className={styles.actionsBtn} onClick={() => handleButtonClick(1)}>
          기뻐하기
        </div>
        <div className={styles.actionsBtn} onClick={() => handleButtonClick(2)}>
          슬퍼하기
        </div>
        <div className={styles.actionsBtn} onClick={() => handleButtonClick(3)}>
          춤추기
        </div>
      </div>

      <Canvas shadows camera={{ position: [2, 8, 15], fov: 30 }}>
        <MultiRender ref={multiRenderRef} />
      </Canvas>
    </div>
  )
}
