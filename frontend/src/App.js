/* eslint-disable */
import React, { Fragment } from 'react';
import './app.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Alert from './components/layout/Alert';

function App() {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />

                <section className="container">
                    <Alert />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </section>
            </Fragment>
        </BrowserRouter>
    );
}

/* ----------LINKS ON MY QUESTIONS-------------
 * switch, exact:
 * https://stackoverflow.com/questions/45122800/react-router-switch-behavior
 * */

export default App;
