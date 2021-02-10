import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import hash from "./hash";
import Home from "./components/Home/Home.js";
import CreateParty from "./components/Party/Host/CreateParty.js";
import SongsFromSpotify from "./components/Party/Guest/SongsFromSpotify.js";
import Playlist from "./components/Party/Host/Playlist.js";
import WelcomeGuest from "./components/Party/Guest/WelcomeGuest";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useState } from "react";

function App() {
  const [partyID, setPartyID] = useState("");
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/create">
            <CreateParty setPartyID={setPartyID} />
          </Route>
          <Route path="/party/:partyID" component={SongsFromSpotify}></Route>
          <Route path="/join/:partyID" component={WelcomeGuest}></Route>
          <Route path="/party" component={SongsFromSpotify}></Route>
          <Route path="/:partyID" component={Playlist}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
