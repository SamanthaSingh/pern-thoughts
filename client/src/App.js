import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ThoughtList from './components/thoughtlist';
import AddThought from './components/addthough';
import EditThought from './components/editthought';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/" style={{textDecoration: 'none', color: 'white', textTransform: 'uppercase'}}>Home</Link></li>
            <li><Link to="/thought" style={{textDecoration: 'none', color: 'white', textTransform: 'uppercase'}}>Add Thought</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <ThoughtList/>
          </Route>
          <Route path="/thought">
            <AddThought/>
          </Route>
          <Route path="/edit/:id" component={EditThought}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
