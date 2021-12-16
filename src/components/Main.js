import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Register } from './Register';
import { Navbar } from './Navbar';
import { Header } from './Header';
import { Posts } from './Posts';
import { Dashboard } from './Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import './Main.scss';

export const Main = () => {
    const location = useSelector(state => state.location);
    return (
        <main>
            <Router>
                <Navbar title={location.title} />
                <div className='Main'>
                    <Header title={location.title} />
                    <div className='Content'>
                        <Route exact path="/"><Dashboard /></Route>
                        <Route path="/register"><Register /></Route>
                        <Route path="/blog"><Posts /></Route>
                        <Redirect to="/" />
                    </div>
                </div>
            </Router>
        </main>
    )
}
