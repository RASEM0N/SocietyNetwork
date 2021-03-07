import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { Spinner } from '../common/Spinner';
import PostItem from '../posts/postItem';
import CommentForm from './commentForm';

const Post = ({ getPost, post: { post, isLoading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return isLoading || post === null ? (
        <Spinner />
    ) : (
        <>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm post={post} />
        </>
    );
};

const mapStateToProps = (state) => ({
    post: state.post,
});

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, {
        getPost,
    }),
    withRouter
)(Post);
