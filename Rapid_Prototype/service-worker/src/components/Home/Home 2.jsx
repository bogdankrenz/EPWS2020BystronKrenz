import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ margin: "10px" }}>
      <Link to="/party">
        <Button variant="success">Sign in with Spotify</Button>
      </Link>
      <div style={{ margin: "10px" }}>
        <Link to="/create">
          <Button variant="primary">Create Party</Button>
        </Link>
      </div>
    </div>
  );
}
