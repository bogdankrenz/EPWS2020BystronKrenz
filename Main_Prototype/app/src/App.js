import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useState } from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import React from "react";

import Home from "./pages/Home.js";
import CreateParty from "./pages/CreateParty.js";
import GuestRegistered from "./pages/GuestRegistered.js";
import GuestWelcome from "./pages/GuestWelcome";
import HostDashboard from "./pages/HostDashboard.js";

function App() {
  const [partyID, setPartyID] = useState("");
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/create">
            <CreateParty setPartyID={setPartyID} />
          </Route>
          <Route path="/party/:partyID" component={GuestRegistered}></Route>
          <Route path="/join/:partyID" component={GuestWelcome}></Route>
          <Route path="/party" component={GuestRegistered}></Route>
          <Route path="/:partyID" component={HostDashboard}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
