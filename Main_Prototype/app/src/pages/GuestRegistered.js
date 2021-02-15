import React, { useState, useEffect } from "react";
import axios from "axios";
import hash from "../helpers/hash";
import BACKEND_URL from "../helpers/constants";
import RealTimeGuest from "../components/realTimeGuest";

export default function GuestRegistered() {
  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [contribution, setContribution] = useState(false);

  const partyID = localStorage.getItem("partyID");
  const _token = hash.access_token;

  useEffect(() => {
    setLoading(true);
    if (_token) {
      setContribution(true);
      axios
        .put(
          `https://party-together-server.herokuapp.com/parties/${partyID}/newGuest?token=${_token}`
        )
        .then((res) => {
          setSongs(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setContribution(false);
      axios
        .get(
          `https://party-together-server.herokuapp.com/parties/${partyID}/songs`
        )
        .then((res) => {
          setSongs(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (isLoading) {
    return <h3 className="login">Loadingggg...</h3>;
  }

  return (
    <div className="login">
      <div className="header">
        <RealTimeGuest partyID = {partyID}/>
        <h3>Welcome to Party Together!</h3>
        {contribution ? (
          <p>Here are some of the songs that we found...</p>
        ) : (
          <p>Here are some of the songs that are in the playlist</p>
        )}
      </div>
      <ul className="user-songs">
        {songs.map((song, index) => {
          return (
            <li key={index}>
              <img src={song.images[2].url} alt="album-cover" />
              <h5 style={{ display: "inline-block", margin: "2px" }}>
                {song.artist} - {song.title}
              </h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
