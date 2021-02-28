import React, { Fragment } from 'react';
import './app.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

function App() {
    return (
        <Fragment>
            <Navbar />
            <Landing />
        </Fragment>
    );
}

export default App;
