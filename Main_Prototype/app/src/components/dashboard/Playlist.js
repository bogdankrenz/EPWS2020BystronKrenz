import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Playlist(params) {

  const classes = useStyles();
  const songs = params.songs;
  

  if (songs) {
    return (
      <React.Fragment>
      <Title>Recomended Songs</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Party Fit</TableCell>
            <TableCell align="right">Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell><img src={song.images[2].url} alt="album-cover" /></TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.partyFit}</TableCell>
              <TableCell align="right">{song.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Songs
        </Link>
      </div>
    </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
      <Title>Recomended Songs</Title>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Invite Guest to see Songs
        </Link>
      </div>
    </React.Fragment>
    );
  }
}
