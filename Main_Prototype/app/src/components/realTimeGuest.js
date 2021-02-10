import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
const ENDPOINT = "localhost:3333";

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
      <h1 style={{ color: "#fff", textAlign: "center" }}>
        Guests: {response}
      </h1>
    );

}

export default RealTimeGuest