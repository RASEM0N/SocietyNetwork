const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

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

// @route           POST api/profile
// @description     Create or update current user profile
// @access          Private
router.post(
    '/',
    auth,
    [
        body('status', 'Status is required').not().isEmpty(),
        body('skills', 'Skills is required').not().isEmpty(),
    ],
    async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: errors.apply(),
            });
        }

        const {
            company,
            website,
            skills,
            location,
            bio,
            githubusername,
            status,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
            // spread the rest of the fields we don't need to check
            ...rest
        } = req.body;

        // Bild profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.status = status;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills)
            profileFields.skills = skills
                .split(',')
                .map((skill) => skill.trim());

        // Build social array
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.youtube = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            // Update
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {
                        user: req.user.id,
                    },
                    { $set: profileFields },
                    { new: true }
                );

                return res.status(200).json({
                    success: true,
                    action: 'Profile update',
                    data: profile,
                });
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            return res.status(200).json({
                success: true,
                action: 'Create new profile',
                data: profile,
            });
        } catch (e) {
            console.error(e.message);
            return res.status(500).json({
                success: false,
                msg: `Server error`,
            });
        }
    }
);

// @route           GET api/profile/
// @description     Get all profile
// @access          Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate({
            path: 'user',
            select: 'name avatar',
        });

        if (profiles === null) {
            return res.status(200).json({
                success: true,
                msg: 'No profiles available',
            });
        }

        return res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles,
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            success: true,
            msg: 'Server erro',
        });
    }
});

// @route           GET api/profile/:user_Id
// @description     Get profile by user ID
// @access          Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate({
            path: 'user',
            select: 'name avatar',
        });

        console.log(profile);

        if (!profile) {
            return res.status(400).json({
                success: false,
                msg: 'Profile not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (e) {
        console.error(e);

        if (e.kind === `ObjectId`) {
            return res.status(400).json({
                success: false,
                msg: 'Profile not found',
            });
        }
        return res.status(500).json({
            success: false,
            msg: 'Server error',
        });
    }
});

// @route           Delete api/profile
// @description     Delete profile, user & posts
// @access          Private
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndDelete({
            user: req.user.id,
        });
        await User.findOneAndDelete({
            _id: req.user.id,
        });

        return res.status(200).json({
            success: true,
            msg: 'User deleted',
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            success: false,
            msg: 'Server error',
        });
    }
});

// @route           PUT api/profile
// @description     Add profile experience
// @access          Private
router.put(
    '/experience',
    [
        auth,
        body('title', 'Title is required').not().isEmpty(),
        body('company', 'Title is company').not().isEmpty(),
        body('from', 'Title is from').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                succcess: false,
                errors: errors.array(),
            });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);

            await profile.save();
            return res.status(200).json({
                success: true,
                data: profile,
            });
        } catch (e) {
            console.error(e.message);
            return res.status(500).json({
                success: false,
                msg: 'Server error',
            });
        }
    }
);

module.exports = router;
