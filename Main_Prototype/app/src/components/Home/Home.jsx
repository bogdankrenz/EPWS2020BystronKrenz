import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import hash from "../../hash";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "0be1f8b94d5e48599b0b2121080e8b67";
const redirectUri = "http://localhost:3000/party";
const scopes = ["user-top-read"];
const state = generateRandomString(16);
window.location.hash = "";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default function Home() {

  const [token, setToken] = useState({});

  useEffect(() => {
    //set token
    let _token = hash.access_token;
    if (_token) {
      //set token
      setToken({
        token: _token,
      });
    }
  }, []);

  return (
    <div>
      <div className="login">
        <a
          className="btn btn-success login"
          href={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes[0]}&state=34fFs29kd09`}
        >
          Join with Spotify
        </a>
      </div>
      <div className="login">
        <a href="/create" className="btn btn-primary login">
          Create Party
        </a>
      </div>
    </div>
  );
}

// ${authEndpoint}?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}
// ${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true
//GET https://accounts.spotify.com/authorize?client_id=0be1f8b94d5e48599b0b2121080e8b67&response_type=token&redirect_uri=http%3A%2F%2localhost%3A3000%2Fparty&scope=user-read-private%20user-read-email&state=34fFs29kd09
