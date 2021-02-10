import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "0be1f8b94d5e48599b0b2121080e8b67";
const redirectUri = "https://party-together.herokuapp.com/party";
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

export default function WelcomeGuest() {
  const match = useRouteMatch();
  const partyID = match.params.partyID;
  console.log(partyID);
  localStorage.setItem("partyID", partyID);
  // Welcome Guest! :)
  // This is a Spotify Powered App for getting everyone's music wish come true!
  // You can decide if you want to contribute Songs for the Host by signing in with your Spotify Account below.
  // If not, just join and see what others have been contributing so far!

  // JOIN WITH SPOTIFY TO VOTE
  // JUST SHOW THE SONGS ALREADY
  return (
    <div className="login-guest">
      <div className="header">
        <h3>Welcome Guest! :)</h3>
        <p>
          This is a Spotify Powered App for getting everyone's music wish come
          true!
        </p>
        <p>
          You can decide if you want to contribute Songs for the Host by signing
          in with your Spotify Account below.
        </p>
        <p>
          If not, just join and see what others have been contributing so far!
          :D
        </p>
      </div>
      <div className="login">
        <a
          className="btn btn-success login"
          href={`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes[0]}&state=34fFs29kd09`}
        >
          JOIN WITH SPOTIFY TO VOTE
        </a>
        <Link className="btn btn-primary login" to={`/party/${partyID}`}>
          JUST SHOW THE SONGS ALREADY
        </Link>
      </div>
    </div>
  );
}
