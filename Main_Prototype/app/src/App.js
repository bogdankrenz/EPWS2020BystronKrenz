import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import hash from "./hash";
import Home from "./components/Home/Home.jsx";
import CreateParty from "./components/Party/Host/CreateParty.jsx";
import PartyDetails from "./components/Party/Guest/PartyDetails.jsx";
import Playlist from "./components/Party/Host/Playlist.jsx";
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
          <Route path="/party/:partyID" component={PartyDetails}></Route>
          <Route path="/:partyID" component={Playlist}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
