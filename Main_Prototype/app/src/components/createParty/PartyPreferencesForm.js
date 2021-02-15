import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import axios from "axios";
import qs from "qs";


const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function AddressForm(params) {

  const classes = useStyles();

  const [partyName, setPartyName] = useState("");
  const [slider, setSlider] = useState(5);
  const [explicit, setExplicit] = useState(true);
  const [instrumental, setInstrumental] = useState(false);

  function handleNext(e) {
    e.preventDefault();
    // send created party details to the backend
    axios({
      method: "post",
      url: "https://party-together-server.herokuapp.com/parties",
      data: qs.stringify({
        partyName: partyName,
        explicitSongsAccepted: explicit,
        justInstrumental: instrumental,
        preferredEnergy: slider,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => {
        let partyID = res.data._id;
        console.log(res.data._id);
        params.myCallback(partyID)
        //window.location = `/${partyID}`;
      })
      .catch((err) => console.error(err));
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Party Preferences
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="partyName"
            name="partyName"
            label="Party name"
            fullWidth
            onChange={(e) => setPartyName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="energy-slider" gutterBottom>
            Choose preferred energy level
          </Typography>
          <Slider
            defaultValue={5}
            getAriaValueText={valuetext}
            aria-labelledby="energy-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            onChange={(e) => setSlider(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox defaultChecked color="secondary" name="saveAddress" value="yes" />}
            label="Accept explicit songs"
            onClick={(e) => setExplicit(!explicit)}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Instrumental songs only"
            onClick={(e) => setInstrumental(!instrumental)}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
      <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleNext}
      >
        Next
      </Button>
      </div>
    </React.Fragment>
  );
}
