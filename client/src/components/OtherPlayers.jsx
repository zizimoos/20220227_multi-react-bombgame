const OtherPlayers = ({ id, x, z }) => {
  return (
    <group>
      <mesh position={[x, 0.5, z]} castShadow>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="fuchsia" />
      </mesh>
    </group>
  );
};

export default OtherPlayers;
