import React, { useState, useEffect } from "react";

export default function PartyDetails() {
  const [songs, setSongs] = useState({});

  useEffect(() => {
    //here comes API call to the server to get the songs
    //second param is empty array to run this effect on first render only
  }, []);

  return <div>Party Details Component</div>;
}
