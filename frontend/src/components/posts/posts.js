import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';

const Posts = ({ post: { posts, isLoading }, getPosts, match }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    return <div></div>;
};

const mapStateToProps = (state) => ({
    post: state.post,
});

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

export default compose(
    connect(mapStateToProps, {
        getPosts,
    }),
    withRouter
)(Posts);
