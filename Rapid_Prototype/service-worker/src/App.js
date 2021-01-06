import {Navbar, Nav} from "react-bootstrap"
import './App.css';
import Home from "./Home"
import About from "./About"
import Users from "./Users"
import {Link, Route, BrowserRouter as Router, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link ><Link to="/">Home</Link></Nav.Link>
          <Nav.Link ><Link to="/about">About</Link></Nav.Link>
          <Nav.Link ><Link to="/users">Users</Link></Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/users" component={Users}></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
