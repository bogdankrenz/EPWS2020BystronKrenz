import React, { useState, useEffect } from "react";
import axios from "axios";
import hash from "../helpers/hash";
import BACKEND_URL from "../helpers/constants";
import { makeStyles } from "@material-ui/core/styles";
import RealTimeGuest from "../components/realTimeGuest";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import io from "socket.io-client";
const ENDPOINT = "https://party-together-server.herokuapp.com";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  layout: {
    width: "100%",
    content: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  container: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  submit: {
    marginBottom: "15px",
    marginTop: "15px",
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
  center: {
    textAlign: "center",
  },
  list_item: {
    justifyContent: "flex-start",
  },
}));

export default function GuestRegistered() {
  const classes = useStyles();

  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [contribution, setContribution] = useState(false);

  const partyID = localStorage.getItem("partyID");
  const _token = hash.access_token;

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (song) => () => {
    const currentIndex = checked.indexOf(song);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(song);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(newChecked);
  };

  const satisfaction = () => {
    window.location = `/satisfaction/${partyID}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var selectedSongs = [];
    setContribution(!contribution);
    checked.forEach((song) => {
      selectedSongs.push(song._id);
    });

    const socket = io(ENDPOINT);

    axios({
      method: "put",
      url: "https://party-together-server.herokuapp.com/songs/voteUp",
      data: { songs: selectedSongs },
    })
      .then(
        socket.on("connect", () => {
          socket.emit("guest", partyID);
        })
      )
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setLoading(true);
    if (_token) {
      axios
        .put(
          `https://party-together-server.herokuapp.com/parties/${partyID}/newGuest?token=${_token}`
        )
        .then((res) => {
          setSongs(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `https://party-together-server.herokuapp.com/parties/${partyID}/songs`
        )
        .then((res) => {
          setSongs(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className={classes.root}>
      <main className={classes.layout}>
        <Grid
          container
          align="center"
          direction="column"
          className={classes.container}
        >
          <Paper className={classes.paper}>
            <Grid container spacing={3} align="center" direction="column">
              <RealTimeGuest partyID={partyID} />
              <Grid item>
                <Typography variant="h4" className={classes.center}>
                  Welcome to Party Together!
                </Typography>
              </Grid>
              <Grid item xs={11}>
                {contribution ? (
                  <Typography gutterBottom className={classes.center}>
                    Here are some of the songs that we found. <br />
                    We already voted and added the songs for you!
                  </Typography>
                ) : (
                  <Typography gutterBottom className={classes.center}>
                    Here are some of the songs that are in the playlist. <br />
                    Check songs that you would like to listen and confirm!
                  </Typography>
                )}
              </Grid>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <form className={classes.container} onSubmit={handleSubmit}>
                  <Grid item xs={8}>
                    <List dense className={classes.list}>
                      {songs.slice(0, 30).map((song) => {
                        const labelId = `checkbox-list-secondary-label-${song}`;
                        return (
                          <ListItem
                            className={classes.list_item}
                            key={song._id}
                            button
                            onClick={handleToggle(song)}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${song + 1}`}
                                src={`${song.images[2].url}`}
                              />
                            </ListItemAvatar>
                            <div style={{ display: "block" }}>
                              <ListItemText
                                id={labelId}
                                primary={`${song.artist}`}
                              />
                              <ListItemText
                                id={labelId}
                                primary={`${song.title}`}
                              />
                            </div>
                            <ListItemSecondaryAction>
                              {_token || contribution ? null : (
                                <>
                                  <Checkbox
                                    edge="end"
                                    onChange={handleToggle(song)}
                                    checked={checked.indexOf(song) !== -1}
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </>
                              )}
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                    <Grid item>
                      {!_token && !contribution ? (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Confirm Votes
                        </Button>
                      ) : (
                        <Grid
                          container
                          align="center"
                          direction="column"
                        >
                          <Grid item>
                            <Typography gutterBottom className={classes.center}>
                              Great, your votes were confirmed! <br />
                              Another thing you could do is 👇🏼
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              onClick={satisfaction}
                            >
                              Rate the current music
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </form>
              )}
            </Grid>
          </Paper>
        </Grid>
      </main>
    </div>
  );
}
