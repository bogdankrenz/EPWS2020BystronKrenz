import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { ReactComponent as SpotifyLogo } from "../media/spotify-logo.svg";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import Grid from "@material-ui/core/Grid";
import { FRONTEND_URL } from "../helpers/constants";

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
  center: {
    textAlign: "center",
  },
  spotifyRedirect: {
    width: "200px",
    height: "43px",
    backgroundColor: "#FFFF",
    textTransform: "none",
    fontSize: 15,
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: 50,
    boxShadow: "2px 2px 7px 2px #888888",
    "&:hover": {
      backgroundColor: "#191414",
      color: "#FFFF",
    },
  },
  vote: {
    width: "200px",
    textTransform: "none",
    fontSize: 15,
    borderRadius: 50,
    "&:hover": {
      textDecorationLine: "underline",
      color: "#191414",
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "27px",
    width: "27px",
  },
}));

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "0be1f8b94d5e48599b0b2121080e8b67";
const redirectUri = `${FRONTEND_URL}/party`;
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

  const vote = () => {
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
          <Grid container spacing={3} align="center" direction="column">
            <Grid item xs={11}>
              <Typography variant="h4" gutterBottom className={classes.center}>
                Welcome aboard!
              </Typography>
              <Typography variant="p" gutterBottom className={classes.center}>
                This is a Spotify Powered App for getting everyone's music wish
                come true! <br />
                You can decide if you want to contribute Songs for the Host by
                signing in with your Spotify Account below. If not, just join
                and see what others have been contributing so far!
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Button
                variant="contained"
                onClick={spotifyRedirect}
                className={classes.spotifyRedirect}
                startIcon={<SpotifyLogo className={classes.logo} />}
              >
                Join with Spotify
              </Button>
              <Button className={classes.vote} onClick={vote}>
                Vote others songs
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </div>
  );
}
