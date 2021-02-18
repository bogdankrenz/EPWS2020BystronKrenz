import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "./pages/Home.js";
import CreateParty from "./pages/CreateParty.js";
import GuestRegistered from "./pages/GuestRegistered.js";
import GuestWelcome from "./pages/GuestWelcome";
import HostDashboard from "./pages/HostDashboard.js";
import backgroundImage from "./media/background.jpg";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  shadder: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
}));

function App() {
  const [partyID, setPartyID] = useState("");
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.shadder}>
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
      </div>
    </div>
  );
}

export default App;
