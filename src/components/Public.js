import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Login } from './Login';

export const Public = () => {
    return (
        <Router>
            <Route path="/login"><Login /></Route>
            <Redirect to="/login" />
        </Router>
    )
}
