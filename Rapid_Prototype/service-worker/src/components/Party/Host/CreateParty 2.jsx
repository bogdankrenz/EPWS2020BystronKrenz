import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Playlist from "./Playlist";

export default function CreateParty() {
  return (
    <div>
      <h4>Create Party</h4>
      <input placeholder="name" />
      <Link to="/playlist">
        <Button variant="primary">Submit</Button>
      </Link>
    </div>
  );
}
