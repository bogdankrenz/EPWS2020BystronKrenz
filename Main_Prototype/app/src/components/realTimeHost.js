import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
const ENDPOINT = "localhost:3333";

const RealTimeHost = (params) => {

    const [response, setResponse] = useState("");

    useEffect(() => {
      const socket = io(ENDPOINT);

      socket.on("connect", () => {
        socket.emit("host", params.partyID)
      })

      socket.on("dashboardUpdate", (songs, guestCount) => {
          console.log(songs)
          setResponse(guestCount);
      });

    }, []);
  
    return (
      <h1 style={{ color: "#fff", textAlign: "center" }}>
        Guests: {response}
      </h1>
    );

}

export default RealTimeHost