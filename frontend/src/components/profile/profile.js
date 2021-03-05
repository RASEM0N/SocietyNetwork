import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../common/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({
    profile: { profile, loading },
    match,
    auth,
    getProfileById,
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : profile === null ? (
                'Такого профиля нету'
            ) : (
                <>
                    <Link to={'/profiles'} className={'btn btn-light'}>
                        Back to profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user.data._id === profile.user._id && (
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )}
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getProfileById,
})(withRouter(Profile));
