import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import hash from "../../../hash";

function PartyDetails() {
  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  console.log(location.pathname);

  let _token = hash.access_token;

  useEffect(() => {
    axios
      .put(
        `https://party-together.herokuapp.com/parties/5ff8288c73949c001795f553/newGuest?token=${_token}`
      )
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  console.log(songs);
  console.log(_token);
  return (
    <div>
      <h3>Welcome to Party Together!</h3>
      <p>Here are some of the songs that we found...</p>
      {songs.map((song) => {
        console.log(song);
        return (
          <div>
            <img src={song.images[2].url} alt="album-cover" />
            <h5 style={{ display: "inline-block", margin: "2px" }}>
              {song.artist} - {song.title}
            </h5>
          </div>
        );
      })}
    </div>
  );
}

export default PartyDetails;
