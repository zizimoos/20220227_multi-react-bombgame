import React, { useRef } from "react";
import Controls from "../controls";

function Player({ id, socket, coinsArray }) {
  const myMove = useRef(null);
  Controls(myMove, id, socket, coinsArray);

  return (
    <group ref={myMove}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="fuchsia" />
      </mesh>
    </group>
  );
}

export default Player;
