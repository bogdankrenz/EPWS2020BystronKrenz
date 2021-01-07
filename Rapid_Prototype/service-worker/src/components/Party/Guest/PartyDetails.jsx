import React, { useState, useEffect } from "react";

var stateKey = "spotify_auth_state";

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

let params = getHashParams();
console.log(params);

var access_token = params.access_token,
  state = params.state,
  storedState = localStorage.getItem(stateKey);

if (access_token && (state == null || state !== storedState)) {
  alert("There was an error during the authentication");
} else {
  localStorage.removeItem(stateKey);
  // if (access_token) {
  //   $.ajax({
  //     url: "https://api.spotify.com/v1/me",
  //     headers: {
  //       Authorization: "Bearer " + access_token,
  //     },
  //     success: function (response) {
  //       console.log(response);
  //     },
  //   });
  // }
}

function PartyDetails() {
  const [songs, setSongs] = useState({});

  useEffect(() => {
    //here comes API call to the server to get the songs
    //second param is empty array to run this effect on first render only
  }, []);

  return <div>Party Details Component</div>;
}

export default PartyDetails;
