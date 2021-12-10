import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import Portfolio from './Portfolio';
import Research from './Research';
import Graphs from './Graphs';
import NavBar from './NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path ="/portfolio">
          <Portfolio />
        </Route>
        <Route exact path ="/research">
          <Research />
        </Route>
        <Route exact path ="/graphs">
          <Graphs />
        </Route>
        <Route exact path ="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
