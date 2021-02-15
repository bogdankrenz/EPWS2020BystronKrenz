import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
const ENDPOINT = "https://party-together-server.herokuapp.com";

const RealTimeGuest = (params) => {

    const [response, setResponse] = useState("");

    useEffect(() => {
      const socket = io(ENDPOINT);

      socket.on("connect", () => {
        socket.emit("guest", params.partyID)
      })
      
      // socket.on("FromAPI", data => {
      //     console.log(data)
      //     setResponse(data);
      // });

    }, []);
  
    return (
      <br />
    );

}

export default RealTimeGuest