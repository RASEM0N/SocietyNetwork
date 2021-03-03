import React, { Fragment, useEffect } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '../common/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = ({
    auth: { user },
    profile: { profile, loading },
    getCurrentProfile,
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.data.name}
            </p>
            {/*Есть аккаунт, но нет профиля для отображения
            Вместо этого перекинет на */}
            {profile !== null ? (
                <Fragment>есть профиль</Fragment>
            ) : (
                <Fragment>
                    <p>Нет профиля</p>
                    <Link
                        to={'/create-profile'}
                        className={'btn btn-primary my-1'}
                    >
                        Создать профиль
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getCurrentProfile,
})(Dashboard);
