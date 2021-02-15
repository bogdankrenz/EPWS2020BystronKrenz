import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import Button from '@material-ui/core/Button';
import { Link, useRouteMatch } from "react-router-dom";
import HostDashboard from "./HostDashboard";

export default function CreateParty({ setPartyID }) {
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
      <h4 style={{ color: "#fff", textAlign: "center" }}>Create Party</h4>
      <form onSubmit={handleSubmit}>
        <input
          value={partyName}
          placeholder="name"
          onChange={(e) => setPartyName(e.target.value)}
        />
        <div className="slideContainer">
          <label>Energy Level of the Partey (1 lowest, 10 highest)</label>
          <input
            value={slider}
            type="range"
            min="1"
            max="10"
            className="slider"
            onChange={(e) => setSlider(e.target.value)}
          />
          <output>{slider}</output>
        </div>
        <div style={{ display: "block" }}>
          <input
            style={{ marginRight: "10px", alignItems: "left" }}
            type="checkbox"
            onClick={(e) => setExplicit(!explicit)}
          ></input>
          <label>Explicit Content?</label>
        </div>
        <div style={{ display: "block" }}>
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            onClick={(e) => setInstrumental(!instrumental)}
          ></input>
          <label>Instrumental only?</label>
        </div>
        <Button type="submit" value="Submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
