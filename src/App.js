import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Game from './components/game';
import Home from './components/home';
import ActionCable from 'actioncable';


function App() {
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  return (
    <Router>
      <Switch>
        <Route path="/game/:id">
          <Game cable={cable} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
