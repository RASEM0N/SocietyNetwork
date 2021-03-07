import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, post: { _id } }) => {
    const [comment, setComment] = useState('');
    return (
        <>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form
                    className="form my-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addComment(_id, comment);
                    }}
                >
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                    <input
                        type="submit"
                        className="btn btn-dark my-1"
                        value="Submit"
                    />
                </form>
            </div>
        </>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default compose(
    connect(null, {
        addComment,
    })
)(CommentForm);
