import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Copyright from "../pages/CreateParty";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { ReactComponent as SpotifyLogo } from "../media/spotify-logo.svg";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  appBar: {
    position: "relative",
  },
  welcome: {
    textAlign: "center",
  },
  spotifyRedirect: {
    marginBottom: "20px",
    width: "200px",
    backgroundColor: "#90ee90",
    "&:hover": {
      backgroundColor: "#1DB954",
    },
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: "0",
      marginRight: "20px",
    },
  },
  logo: {
    height: "25px",
    width: "25px",
  },
  login: {
    textAlign: "center",
    padding: "30px",
  },
  noSpotifyRedirect: {
    width: "200px",
  },
}));

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "0be1f8b94d5e48599b0b2121080e8b67";
const redirectUri = "http://localhost:3000/party";
const scopes = ["user-top-read"];
const state = generateRandomString(16);
window.location.hash = "";

/**
 * Generates a random string containing numbers and letters to enhance security while requesting the spotify API
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

export default function GuestWelcome() {
  const classes = useStyles();
  // partyID is taken from query param and saved in the local storage
  const match = useRouteMatch();
  const partyID = match.params.partyID;
  localStorage.setItem("partyID", partyID);

  const spotifyRedirect = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes[0]}&state=${state}`;
  };

  const noSpotifyRedirect = () => {
    window.location = `/party/${partyID}`;
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Party Together
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="h4" gutterBottom className={classes.welcome}>
              Welcome aboard!
            </Typography>
            <Typography variant="p" gutterBottom className={classes.info}>
              This is a Spotify Powered App for getting everyone's music wish
              come true!
            </Typography>
            <p></p>
            <p>
              You can decide if you want to contribute Songs for the Host by
              signing in with your Spotify Account below.
            </p>
            <p>
              If not, just join and see what others have been contributing so
              far!
            </p>
          </div>
          <div className={classes.login}>
            <Button
              variant="contained"
              color=""
              onClick={spotifyRedirect}
              className={classes.spotifyRedirect}
              startIcon={<SpotifyLogo className={classes.logo} />}
            >
              JOIN WITH SPOTIFY
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.noSpotifyRedirect}
              onClick={noSpotifyRedirect}
              startIcon={<FormatListNumberedIcon />}
            >
              SHOW THE LIST
            </Button>
          </div>
        </Paper>
      </main>
    </div>
  );
}
