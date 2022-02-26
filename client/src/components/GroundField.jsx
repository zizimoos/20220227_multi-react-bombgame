import React from "react";

function GroundField(props) {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="lightBlue" />
    </mesh>
  );
}

export default GroundField;
