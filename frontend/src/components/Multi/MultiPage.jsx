import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import { Suspense, useRef } from "react"
import { Physics } from "@react-three/rapier"
import { useRecoilState } from "recoil"
import { isFloatingButtonVisibleAtom } from "../../atom/MultiAtom"

export const MultiPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const multiRenderRef = useRef()

  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useRecoilState(isFloatingButtonVisibleAtom)

  const handleButtonClick = (action) => {
    if (multiRenderRef.current?.publishActions) {
      multiRenderRef.current.publishActions(action)
    }

    setIsFloatingButtonVisible(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.FloatingButton} onClick={() => setIsFloatingButtonVisible(true)}>
        <img
          src={`${urlPath}/assets/icons/white_plus.png`}
          className={`${styles.PlusButton} ${isFloatingButtonVisible ? styles.Rotate : styles.RotateBack}`}
        />
      </div>
      {isFloatingButtonVisible && (
        <>
        <div className={styles.Overlay} onClick={() => setIsFloatingButtonVisible(false)} />
        <div className={styles.BtnList}>
          <div className={styles.actionsBtn} onClick={() => handleButtonClick(1)}>
            <div className={styles.FloatContent}>기뻐하기</div>
            <div className={styles.IconButton}>
              <img src={`${urlPath}/assets/icons/smile.png`} className={styles.FloatIcon} />
            </div>
          </div>
          <div className={styles.actionsBtn} onClick={() => handleButtonClick(2)}>
            <div className={styles.FloatContent}>슬퍼하기</div>
            <div className={styles.IconButton}>
              <img src={`${urlPath}/assets/icons/sad.png`} className={styles.FloatIcon} />
            </div>
          </div>
          <div className={styles.actionsBtn} onClick={() => handleButtonClick(3)}>
            <div className={styles.FloatContent}>춤추기</div>
            <div className={styles.IconButton}>
              <img src={`${urlPath}/assets/icons/dance.png`} className={styles.FloatIcon} />
            </div>
          </div>
        </div>
        </>
      )}
      <Canvas shadows camera={{ position: [2, 8, 15], fov: 30, zoom: 0.72 }}>
        <Suspense>
          <Physics>
            <MultiRender ref={multiRenderRef} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
