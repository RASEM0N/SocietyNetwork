import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProfileItem from './profileItem';
import { getAllProfile } from '../../actions/profile';
import { Spinner } from '../common/Spinner';

const Profiles = ({ profile: { loading, profiles }, getAllProfile }) => {
    useEffect(() => {
        getAllProfile();
    }, [getAllProfile]);

    return (
        <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect
                with developers
            </p>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {profiles.length > 0 ? (
                        profiles.map((profile) => {
                            return (
                                <ProfileItem
                                    key={profile._id}
                                    profile={profile}
                                />
                            );
                        })
                    ) : (
                        <h4>profile found...</h4>
                    )}
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});
export default connect(mapStateToProps, {
    getAllProfile,
})(Profiles);
