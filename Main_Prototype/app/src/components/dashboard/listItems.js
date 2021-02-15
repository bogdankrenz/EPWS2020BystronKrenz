import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AlbumIcon from '@material-ui/icons/Album';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LibraryMusicIcon />
      </ListItemIcon>
      <ListItemText primary="Party Preferences" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved Playlists</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AlbumIcon />
      </ListItemIcon>
      <ListItemText primary="Playlist 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AlbumIcon />
      </ListItemIcon>
      <ListItemText primary="Playlist 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AlbumIcon />
      </ListItemIcon>
      <ListItemText primary="Playlist 3" />
    </ListItem>
  </div>
);
