import React from "react";
// import { useRecoilState } from "recoil";
// import { coinArrayAtom } from "./atoms";

const Controls = (player, id, socket, coinsArray) => {
  const [myMoveInfo, setMyMoveInfo] = React.useState({});
  // const [coinsArrayAtom, setCoinsArrayAtom] = useRecoilState(coinArrayAtom);

  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        player.current.position.x = player.current.position.x -= 0.5;
        break;
      case 39:
        player.current.position.x = player.current.position.x += 0.5;
        break;
      case 38:
        player.current.position.z = player.current.position.z -= 0.5;
        break;
      case 40:
        player.current.position.z = player.current.position.z += 0.5;
        break;
      default:
    }
    const myIno = {
      id: id,
      x: player.current.position.x,
      z: player.current.position.z,
      point: 0,
    };

    setMyMoveInfo(myIno);
    console.log("myIno", myIno);

    let target = coinsArray.filter((coin) => {
      return (
        coin.x <= myIno.x + 1 &&
        coin.x >= myIno.x - 1 &&
        coin.z <= myIno.z + 1 &&
        coin.z >= myIno.z - 1
      );
    });
    console.log("target", target);
    if (target.length > 0) {
      socket.emit("coin-taken", target[0].id, myIno.id);
    }
    socket.emit("move-myPlayer", myIno);
  };
};
export default Controls;
