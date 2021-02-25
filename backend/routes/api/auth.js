const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route           GET api/auth
// @description     Test Route
// @access          Public
router.route('/').get(auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        await res.status(200).json({
            success: true,
            data: user,
        });
    } catch (e) {
        console.error(e);
        await res.status(400).json({
            success: false,
            msg: `${e.message}`,
        });
    }
});

module.exports = router;
