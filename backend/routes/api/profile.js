const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route           GET api/profile/me
// @description     Get current users profile
// @access          Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate({
            path: 'user',
            select: 'name avatar',
        });

        if (!profile) {
            return res.status(400).json({
                success: false,
                msg: `There is no profile for this user`,
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (e) {
        console.error(e.message);
        return res.status(200).json({
            success: false,
            msg: 'Server error',
        });
    }
});

module.exports = router;
