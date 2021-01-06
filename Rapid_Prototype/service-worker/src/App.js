import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import CreateParty from "./components/Party/Host/CreateParty.jsx";
import PartyDetails from "./components/Party/Guest/PartyDetails.jsx";
import Playlist from "./components/Party/Host/Playlist.jsx";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/create" component={CreateParty}></Route>
          <Route path="/party" component={PartyDetails}></Route>
          <Route path="/playlist" component={Playlist}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
