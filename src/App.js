import React, { useState, useEffect } from 'react'
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";


const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}
export default App