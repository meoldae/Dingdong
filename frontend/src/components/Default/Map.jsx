import React, { useEffect, useRef } from "react";
import { extend, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
extend({ GLTFLoader });

const Map = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;
  const { scene } = useThree();
  const map = useLoader(
    GLTFLoader,
    // `${urlPath}/assets/models/defaultSettings/Map4.glb`,
    `${urlPath}/assets/models/defaultSettings/finalMap2.glb`,
    (loader) => {
      const draco = new DRACOLoader();
      draco.setDecoderPath(`${urlPath}/assets/draco/`);
      loader.setDRACOLoader(draco);
    }
  );
  const mapRef = useRef(null);

  useEffect(() => {
    // 그림자 세팅
    if (map && map.scene) {
      map.scene.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
        }
      });
      map.scene.name = "floor";
      scene.add(map.scene);
      mapRef.current = map.scene;
    }

    return () => {
      if (map && map.scene) {
        scene.remove(map.scene);
      }
    };
  }, [map, scene]);

  return null;
};

export default Map;
