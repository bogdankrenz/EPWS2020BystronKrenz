import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FRONTEND_URL } from "../../helpers/constants";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as CopyLinkSymbol } from "../../media/copyLinkSymbol.svg";
import QRCode from "react-qr-code";

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
  socials: {
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "20px",
  },
  icon: {
    marginTop: "-1px",
    marginBottom: "-4px",
  },
  social: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  center: {
    textAlign: "center",
  },
  qr: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    marginTop: "-22px",
  },
}));

export default function SharePartyForm(params) {
  const [copy, setCopy] = useState("");

  const classes = useStyles();

  const partyURL = `${FRONTEND_URL}/join/${params.partyID}`;
  const subject = `Join ${params.partyName} on PartyTogether to make the music yours!`;
  const textAreaRef = useRef(partyURL);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopy("Copied!");
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.center}>
        Share the party with your friends
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.title}>
          <div className={classes.qr}>
            <QRCode value={partyURL} size={"150"} />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.title}>
          <Typography gutterBottom className={classes.center}>
            To see the favorite songs of your guests invite them to your party!{" "}
            <br />
            Share the Link or let them scan the QR Code so they can join.
          </Typography>
        </Grid>
        <div className={classes.socials}>
          <IconButton>
            <WhatsappShareButton title={subject} url={partyURL}>
              <WhatsappIcon size={32} round className={classes.icon} />
            </WhatsappShareButton>
          </IconButton>
          <IconButton>
            <TelegramShareButton title={subject} url={partyURL}>
              <TelegramIcon size={32} round className={classes.icon} />
            </TelegramShareButton>
          </IconButton>
          <IconButton>
            <TwitterShareButton
              title={subject}
              url={partyURL}
              via={"PartyTogether"}
            >
              <TwitterIcon size={32} round className={classes.icon} />
            </TwitterShareButton>
          </IconButton>
          <IconButton>
            <FacebookShareButton quote={subject} url={partyURL}>
              <FacebookIcon size={32} round className={classes.icon} />
            </FacebookShareButton>
          </IconButton>
          <IconButton>
            <EmailShareButton
              subject={subject}
              body={`Join on PartyTogether and connect to your Spotify to hear your music at ${params.partyName}`}
              url={partyURL}
            >
              <EmailIcon size={32} round className={classes.icon} />
            </EmailShareButton>
          </IconButton>
          <IconButton
            aria-label="delete"
            url={partyURL}
            onClick={() => {
              navigator.clipboard.writeText(partyURL);
              setCopy("Copied!");
            }}
          >
            <CopyLinkSymbol />
          </IconButton>
          {copy}
        </div>
      </Grid>
    </React.Fragment>
  );
}
