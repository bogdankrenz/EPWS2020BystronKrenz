import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Playlist() {
  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://party-together-server.herokuapp.com/songs`)
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (isLoading) {
    return <h3 className="login">Loading...</h3>;
  }
  console.log(songs);
  return (
    <div className="login">
      <div className="header">
        <h3>Welcome to Party Together!</h3>
        <p>Here are the songs of your guests!</p>
      </div>
      <ul className="user-songs">
        {songs.map((song, index) => {
          console.log(song);
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
    </div>
  );
}
