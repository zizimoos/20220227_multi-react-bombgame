import React, { useState } from "react";
import styled from "styled-components";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import GroundField from "./components/GroundField";
import Player from "./components/Player";

import io from "socket.io-client";
import Coin from "./components/Coin";
import OtherPlayers from "./components/OtherPlayers";

const socket = io("http://localhost:3001");

const CanvasContainer = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

function App() {
  const [PlayerArry, setPlayerArry] = useState([]);
  const [myId, setMyId] = useState("");
  const [coinsArray, setCoinsArray] = useState([]);

  socket.on("init", ({ id, playersArrayServer, coinsArrayServer }) => {
    setMyId(id);
    setPlayerArry(playersArrayServer);
    setCoinsArray(coinsArrayServer);

    socket.on("move-otherPlayer", (playersArrayServer) => {
      setPlayerArry(playersArrayServer);
    });
    socket.on("coin-destroied", (coinsArrayServer) => {
      setCoinsArray(coinsArrayServer);
    });
  });

  return (
    <CanvasContainer>
      <Canvas camera={{ position: [-5, 10, 5] }} shadows>
        <ambientLight />
        <directionalLight
          position={[10, 10, 10]}
          color="white"
          intensity={1}
          castShadow
        />
        <Suspense fallback={null}>
          <Player id={myId} socket={socket} coinsArray={coinsArray} />
          {PlayerArry.map((otherPlayer, index) => {
            console.log(otherPlayer);
            return (
              <OtherPlayers
                key={index}
                id={otherPlayer.id}
                x={otherPlayer.x}
                z={otherPlayer.z}
              />
              // <group key={index}>
              //   <mesh position={[otherPlayer.x, 0.5, otherPlayer.z]}>
              //     <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
              //     <meshStandardMaterial attach="material" color="fuchsia" />
              //   </mesh>
              // </group>
            );
          })}
          {coinsArray.map((coin, index) => {
            return <Coin key={index} id={coin.id} x={coin.x} z={coin.z} />;
          })}

          <GroundField />
        </Suspense>
        <OrbitControls />
        <axesHelper args={[10]} />
      </Canvas>
    </CanvasContainer>
  );
}

export default App;
