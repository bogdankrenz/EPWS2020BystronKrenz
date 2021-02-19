import React, { useState, useEffect } from "react";
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
import Slider from "@material-ui/core/Slider";

import io from "socket.io-client";
const ENDPOINT = "https://party-together-server.herokuapp.com";

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
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function GuestWelcome() {
  const classes = useStyles();

  // partyID is taken from query param and saved in the local storage
  const match = useRouteMatch();
  const partyID = match.params.partyID;
  localStorage.setItem("partyID", partyID);

  const [satisfactionSlider, setSatisfactionSlider] = useState(5);

  useEffect(() => {
    console.log(satisfactionSlider);

    const socket = io(ENDPOINT);

    if (satisfactionSlider !== 5) {
      socket.on("connect", () => {
        socket.emit("satisfactionVote", partyID, satisfactionSlider);
      });
    }
  });

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
                Give Feedback
              </Typography>
              <Typography variant="p" gutterBottom className={classes.center}>
                Your party host can't wait to hear how you like the music
                selection tonight. <br />
                Based on your voting we can adjust the music.
              </Typography>
            </Grid>
            <Grid item>
              <Typography id="satisfaction-slider" gutterBottom>
                Currently the music is:
              </Typography>
              <Slider
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="satisfaction-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChangeCommitted={(e, value) => setSatisfactionSlider(value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </main>
    </div>
  );
}
