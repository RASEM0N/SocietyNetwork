import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
    deleteComment,
    comment: { _id, text, name, avatar, user, date },
    postId,
    auth,
}) => {
    return (
        <>
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
                        Posted on {''}
                        <Moment format={'DD/MM/YYYY'}>{date}</Moment>
                    </p>
                </div>
                {!auth.loading && user === auth.user.data._id && (
                    <button
                        onClick={(e) => deleteComment(postId, _id)}
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

export default compose(
    connect(mapStateToProps, {
        deleteComment,
    })
)(CommentItem);
