import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../common/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGitHub';

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
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <>
                                {profile.experience.map((experience) => (
                                    <ProfileExperience
                                        key={experience._id}
                                        experience={experience}
                                    />
                                ))}
                            </>
                        ) : (
                            <h4>No experience credentials</h4>
                        )}
                    </div>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                            <>
                                {profile.education.map((education) => (
                                    <ProfileEducation
                                        key={education._id}
                                        education={education}
                                    />
                                ))}
                            </>
                        ) : (
                            <h4>No education credentials</h4>
                        )}
                    </div>

                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
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
