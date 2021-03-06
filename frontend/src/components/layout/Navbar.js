import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul style={{ textTransform: 'uppercase' }}>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={logout} to="#!">
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );

    const questLinks = (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : questLinks}</Fragment>
            )}
        </nav>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = {
    logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
