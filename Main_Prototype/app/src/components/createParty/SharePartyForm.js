import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FRONTEND_URL } from "../../helpers/constants"

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function SharePartyForm(params) {
  const classes = useStyles();

  const partyURL = `${FRONTEND_URL}/join/${params.partyID}`
  const subject = `Join ${params.partyName} on PartyTogether to make the music yours!`

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Share the party with your friends
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.title}>
          <Typography gutterBottom>
            To see the favorite songs of your guests you need to invite them to
            your party! Share the Link so they can join.
          </Typography>
        </Grid>
        <Grid item container xs={12} sm={6}>
        <WhatsappShareButton
            title={subject}
            url={partyURL}
            className="ShareButton"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TelegramShareButton
            title={subject}
            url={partyURL}
            className="ShareButton"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TwitterShareButton
            title={subject}
            url={partyURL}
            via={"PartyTogether"}
            className="ShareButton"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            quote={subject}
            url={partyURL}
            className="ShareButton"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <EmailShareButton
            subject={subject}
            body={`Join on PartyTogether and connect to your Spotify to hear your music at ${params.partyName}`}
            url={partyURL}
            className="ShareButton"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          <Grid container></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
