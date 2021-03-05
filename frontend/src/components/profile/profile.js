import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../common/Spinner';

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
                    <Link to={'/profiles'} className={'btn btn-primary'}>
                        Back to profiles
                    </Link>
                    <br />
                    {profile.user.name}
                    <br />
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user.data._id === profile.user._id && (
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )}
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
