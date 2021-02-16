import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function ConnectSpotifyForm() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Connect your Spotify Account
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Typography gutterBottom className={classes.title}>
            Connect your Spotify Account to play Songs right from the Party
            Dashboard (will be added soon)
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained">Default</Button>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
