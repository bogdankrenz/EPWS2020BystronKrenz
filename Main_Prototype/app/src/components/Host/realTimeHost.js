import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
const ENDPOINT = "https://party-together-server.herokuapp.com";

const RealTimeHost = (params) => {

    const [songs, setResponse] = useState("");

    useEffect(() => {
      const socket = io(ENDPOINT);

      socket.on("connect", () => {
        socket.emit("host", params.partyID)
      })

      socket.on("dashboardUpdate", (songs, guestCount) => {
          console.log(songs)
          setResponse(songs);
      });

    }, []);

    if (songs) {
      return <Songs songs={songs} />;
    } else {
      return <br />;
    }

}

const Songs = (params) => {
  console.log(params.songs)
  return (
    <ul className="user-songs">
      {params.songs.map((song, index) => {
        return (
          <li key={index}>
            <img src={song.images[2].url} alt="album-cover" />
          <h5 style={{ display: "inline-block", margin: "2px" }}>
              {song.artist} - {song.title} - Votes: {song.votes}
          </h5>
        </li>
      );
    })}
  </ul>
  )
}

export default RealTimeHost