import React, { useEffect } from 'react'
import io from 'socket.io-client'
const ENDPOINT = "https://party-together-server.herokuapp.com";

const RealTimeGuest = (params) => {

    useEffect(() => {
      const socket = io(ENDPOINT);

      socket.on("connect", () => {
        socket.emit("guest", params.partyID)
      })

    }, []);
  
    return (
      <br />
    );

}

export default RealTimeGuest