const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route           POST api/posts
// @description     Add post
// @access          Private
router.post(
    '/',
    [auth, body('text', 'Text is required').not().isEmpty()],
    async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: error.array(),
            });
        }

        try {
            const user = await User.findOne({
                _id: req.user.id,
            });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    errors: [{ msg: 'Invalid id' }],
                });
            }

            const post = await Post.create({
                user: req.user.id,
                text: req.body.text,
                avatar: user.avatar,
                name: user.name,
            });

            await res.status(200).json({
                success: true,
                data: post,
            });
        } catch (e) {
            console.error(e.message);
            await res.status(500).json({
                success: false,
                msg: `Server error`,
            });
        }
    }
);

module.exports = router;
