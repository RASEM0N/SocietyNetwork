/* eslint-disable */
import React, { Fragment } from 'react';
import './app.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as _Router_, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';

function App() {
    return (
        <_Router_>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />

                <section className="container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </section>
            </Fragment>
        </_Router_>
    );
}

export default App;
