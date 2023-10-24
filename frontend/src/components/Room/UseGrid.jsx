import * as THREE from "three";



export const useGrid = () => {
  const vector3ToGrid = (vector3) => {
    return [
      Math.floor(vector3.x / 0.24) + 10,
      0,
      Math.floor(vector3.z / 0.24) + 10,
    ];
  };

  const gridToVector3 = (gridPosition) => {
    // console.log(gridPosition)
    return new THREE.Vector3(
      gridPosition[0] * 0.24 - 2.4,
      0,
      gridPosition[2] *  0.24 - 2.4
    );
  };

  return {
    vector3ToGrid,
    gridToVector3,
  };
};
