import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useRouteMatch } from "react-router-dom";
import QRCode from "qrcode.react";

export default function Playlist() {
  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const partyID = match.params.partyID;
  console.log(partyID);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://party-together-server.herokuapp.com/parties/${partyID}/songs`
      )
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (isLoading) {
    return <h3 className="login">Loading...</h3>;
  }
  return (
    <div className="login">
      <div className="header">
        <h3>Welcome to Party Together!</h3>
        <p>Your Guests can join by scanning this QR Code</p>
      </div>
      <QRCode
        bgColor="white"
        fgColor="black"
        value={`https://accounts.spotify.com/authorize?client_id=0be1f8b94d5e48599b0b2121080e8b67&response_type=token&redirect_uri=http://localhost:3000/party/${partyID}&scope=user-read-private%20user-read-email&state=34fFs29kd09&show_dialog=true`}
      />
      <a href={`localhost:3000/join/${partyID}`}>test</a>
      <p className="header">
        After joining, you will see the list of the Songs below
      </p>
      <p className="header">
        You might want to refresh this page to see the songs.
      </p>
      <ul className="user-songs">
        {songs.map((song, index) => {
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
