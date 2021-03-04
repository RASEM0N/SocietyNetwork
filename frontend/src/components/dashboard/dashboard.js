import React, { Fragment, useEffect } from 'react';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '../common/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
    auth: { user },
    profile: { profile, loading },
    getCurrentProfile,
    deleteAccount,
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
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteAccount()}
                        >
                            <i className="fas fa-user-minus" /> Delete My
                            Account
                        </button>
                    </div>
                </Fragment>
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
    deleteAccount,
})(Dashboard);
