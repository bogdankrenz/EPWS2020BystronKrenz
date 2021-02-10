import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import hash from "../../../hash";
import "../../../App.css";
import { Button } from "react-bootstrap";
import BACKEND_URL from "../../../constants";
import RealTimeGuest from "../../realTimeGuest";
import RealTimeHost from "../../realTimeHost";

function PartyDetails() {
  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [contribution, setContribution] = useState(false);

  const partyID = localStorage.getItem("partyID");

  let _token = hash.access_token;

  // /parties/partyID -> party details

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

export default PartyDetails;
