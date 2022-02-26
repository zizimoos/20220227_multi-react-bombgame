import React from "react";

const Controls = (player, id, socket) => {
  const [myMoveInfo, setMyMoveInfo] = React.useState({});
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
    };
    setMyMoveInfo(myIno);
    console.log("myIno", myIno);
    socket.emit("move-myPlayer", myIno);
  };
};
export default Controls;
