import React from "react";

function Coin({ id, x, z }) {
  return (
    <group>
      <mesh position={[x, 0.5, z]} castShadow>
        <sphereBufferGeometry attach="geometry" args={[0.5, 32, 16]} />
        <meshStandardMaterial attach="material" color="mediumBlue" />
      </mesh>
    </group>
  );
}

export default Coin;
