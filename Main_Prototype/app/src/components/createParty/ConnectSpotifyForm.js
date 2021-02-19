import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as SpotifyLogoGreen } from "../../media/spotify-logo.svg";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  spotifyRedirect: {
    marginBottom: "5px",
    width: "200px",
    backgroundColor: "#FFFF",
    textTransform: 'none',
    fontSize: 15,
    fontWeight: "bold",
    padding: '6px 12px',
    borderRadius: 50,
    boxShadow: "2px 2px 7px 2px #888888",
    "&:hover": {
      backgroundColor: "#191414",
      color: "#FFFF",
    }
  },
  logo: {
    height: "27px",
    width: "27px",
  }
}));

export default function ConnectSpotifyForm() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3} align="center" direction="column">
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.center}>
            Connect your Spotify Account
          </Typography>
        </Grid>
        <Grid item>
        <Button
              variant="contained"
              onClick={"not done"}
              className={classes.spotifyRedirect}
              startIcon={<SpotifyLogoGreen className={classes.logo} />}
            >
              Join with Spotify
            </Button>
        </Grid>
        <Grid item xs={10}>
          <Typography gutterBottom className={classes.center} >
            Connect your Spotify Account to play Songs right from the Party
            Dashboard (will be added soon)
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
