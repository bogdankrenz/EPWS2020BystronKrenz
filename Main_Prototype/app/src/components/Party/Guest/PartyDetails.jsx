import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import hash from "../../../hash";
import "../../../App.css";
import { Button } from "react-bootstrap";
import BACKEND_URL from "../../../constants";

function PartyDetails() {
  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const match = useRouteMatch();
  const partyID = match.params.partyID;
  console.log(match.params.partyID);

  let _token = hash.access_token;

  useEffect(() => {
    setLoading(true);
    axios
      .put(
        `https://party-together-server.herokuapp.com/parties/${partyID}/newGuest?token=${_token}`
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
        <p>Here are some of the songs that we found...</p>
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
      <div className="login">
        <a href="/" className="btn btn-primary login">
          Great!
        </a>
      </div>
    </div>
  );
}

export default PartyDetails;
