import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import hash from "../../hash";

export const authEndpoint = "https://accounts.spotify.com/authorize"; // Replace with your app's client ID, redirect URI and desired scopes
const clientId = "0be1f8b94d5e48599b0b2121080e8b67";
const redirectUri = "http://localhost:3000/party";
const scopes = ["user-top-read"]; // Get the hash of the url
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
    <div className="App">
      <a
        className="btn btn--loginApp-link"
        href={`${authEndpoint}?response_type=token&client_id=${clientId}&scope=${scopes.join(
          "%20"
        )}&redirect_uri=${redirectUri}&state=${state}`}
      >
        Login to Spotify
      </a>
    </div>
  );
}