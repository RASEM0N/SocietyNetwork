import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
    addLike,
    removeLike,
}) => {
    let isLike;
    if (!auth.loading) {
        isLike = likes.filter((item) => {
            return item.user === auth.user.data._id;
        });
    }

    return (
        <>
            {auth.loading ? (
                ''
            ) : (
                <div className="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/profile/${user}`}>
                            <img
                                className="round-img"
                                src={avatar}
                                alt="Server error"
                            />
                            <h4>{name}</h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">{text}</p>
                        <p className="post-date">
                            Posted on{' '}
                            <Moment format={'DD/MM/YYYY'}>{date}</Moment>
                        </p>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => addLike(_id)}
                            disabled={isLike.length === 1}
                        >
                            <i className="fas fa-thumbs-up"></i>
                            <span>
                                {likes.length > 0 && (
                                    <span> {likes.length}</span>
                                )}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => removeLike(_id)}
                            disabled={isLike.length !== 1}
                        >
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion{' '}
                            {comments.length > 0 && (
                                <span className="comment-count">
                                    {comments.length}
                                </span>
                            )}
                        </Link>
                        {!auth.loading && user === auth.user.data._id && (
                            <button type="button" className="btn btn-danger">
                                <i className="fas fa-times" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

export default compose(
    connect(mapStateToProps, {
        addLike,
        removeLike,
    })
)(PostItem);
