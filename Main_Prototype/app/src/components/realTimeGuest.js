import React, { useEffect } from 'react'
import io from 'socket.io-client'
const ENDPOINT = "https://party-together-server.herokuapp.com";

const RealTimeGuest = (params) => {

    useEffect(() => {
      const socket = io(ENDPOINT);

      const vote = "123456789"

      socket.on("connect", () => {
        socket.emit("guest", params.partyID)
        socket.emit("satisfactionVote", vote);
      })

    }, []);
  
    return (
      <br />
    );

}

export default RealTimeGuest