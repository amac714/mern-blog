import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Navbar from './components/layout/Navbar';
import Landing from './components/routes/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
