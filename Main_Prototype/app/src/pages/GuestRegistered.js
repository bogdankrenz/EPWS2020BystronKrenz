import React, { useState, useEffect } from "react";
import axios from "axios";
import hash from "../helpers/hash";
import BACKEND_URL from "../helpers/constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RealTimeGuest from "../components/realTimeGuest";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: "#fff",
    textAlign: "center",
  },
  info: {
    color: "#1DB954",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
      textAlign: "center",
      maxWidth: "350px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export default function GuestRegistered() {
  const classes = useStyles();
  const theme = useTheme();

  const [songs, setSongs] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [contribution, setContribution] = useState(false);

  const partyID = localStorage.getItem("partyID");
  const _token = hash.access_token;

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    setLoading(true);
    if (_token) {
      setContribution(true);
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
      setContribution(false);
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

  if (isLoading) {
    return <h3 className="login">Loadingggg...</h3>;
  }
  console.log(songs);
  return (
    <div className="login">
      <div className="header">
        <RealTimeGuest partyID={partyID} />
        <Typography variant="h4" className={classes.title}>
          Welcome to Party Together!
        </Typography>
        {contribution ? (
          <Typography variant="h6" className={classes.info}>
            Here are some of the songs that we found! We already voted and added
            the songs for you!
          </Typography>
        ) : (
          <Typography variant="h6" className={classes.info}>
            Here are some of the songs that are in the playlist! Check songs
            that you would like to listen and confirm!
          </Typography>
        )}
      </div>
      <List dense className={classes.root}>
        {songs.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`${value.images[2].url}`}
                />
              </ListItemAvatar>
              <div style={{ display: "block" }}>
                <ListItemText id={labelId} primary={`${value.artist}`} />
                <ListItemText id={labelId} primary={`${value.title}`} />
              </div>
              <ListItemSecondaryAction>
                {/*  */}
                {_token ? (
                  <ListItemText id={labelId} primary={`${value.votes} Votes`} />
                ) : (
                  <>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
