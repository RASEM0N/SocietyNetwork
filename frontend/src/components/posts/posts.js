import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostItem from './postItem';
import { Spinner } from '../common/Spinner';
import PostForm from './postForm';

const Posts = ({ post: { posts, isLoading }, getPosts, match }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    return (
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="posts">
                    {posts.length > 0
                        ? posts.map((post) => {
                              return <PostItem key={post._id} post={post} />;
                          })
                        : 'NOT POSTS'}
                </div>
            )}
        </>
    );
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
