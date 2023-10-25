// Map.jsx
import React, { useEffect, useRef } from "react";
import { extend, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// GLTFLoader를 react-three-fiber의 hook에서 사용 가능하도록 확장
extend({ GLTFLoader });

const TempMap = () => {
  const { scene } = useThree();
  const gltf = useLoader(GLTFLoader, "assets/models/floor.glb");

  const mapRef = useRef(null);

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.position.set(0, 0, 0); // 회전값 설정
      gltf.scene.name = "floor";
      scene.add(gltf.scene);
      mapRef.current = gltf.scene;
    }

    return () => {
      if (gltf && gltf.scene) {
        scene.remove(gltf.scene);
      }
    };
  }, [gltf, scene]);

  return null;
};

export default TempMap;
