import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import Playlist from "./Playlist";
import "./style.css";
import RealTimeHost from "../../realTimeHost";

export default function CreateParty() {
  const [slider, setSlider] = useState(5);
  const [explicit, setExplicit] = useState(false);
  const [instrumental, setInstrumental] = useState(false);
  const [partyName, setPartyName] = useState("");
  let partyID;
  const match = useRouteMatch();
  console.log(match);

  function handleSubmit(e) {
    e.preventDefault();
    // send created party details to the backend
    axios({
      method: "post",
      url: "https://party-together-server.herokuapp.com/parties",
      data: qs.stringify({
        partyName: partyName,
        explicitSongsAccepted: explicit,
        justInstrumental: instrumental,
        preferredEnergy: slider,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => {
        partyID = res.data._id;
        console.log(res.data._id);
        window.location = `/${partyID}`;
      })
      .catch((err) => console.error(err));
  }

  console.log(partyName);
  return (
    <div className="login">
      <RealTimeHost partyID='60227cc4d7ffb9139887ea8e'//= {partyID}
      />
      <h4 style={{ color: "#fff", textAlign: "center" }}>Create Party</h4>
      <form onSubmit={handleSubmit}>
        <input
          value={partyName}
          placeholder="name"
          onChange={(e) => setPartyName(e.target.value)}
        />
        <div className="slideContainer">
          <label>Energy Level of the Partey (0 lowest, 10 highest)</label>
          <input
            value={slider}
            type="range"
            min="0"
            max="10"
            className="slider"
            onChange={(e) => setSlider(e.target.value)}
          />
          <output>{slider}</output>
        </div>
        <label>Explicit Content?</label>
        <input type="checkbox" onClick={(e) => setExplicit(!explicit)}></input>
        <label>Instrumental only?</label>
        <input
          type="checkbox"
          onClick={(e) => setInstrumental(!instrumental)}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
