import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from '../Auth/Login';
import Home from '../Home/Home';


const Routes = () => {
    if(localStorage.getItem('token')){
        return(
            <div style={{display:'flex'}}>
                <Router>
                    <Home/>
                </Router>
            </div>
        )
    }else{
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes