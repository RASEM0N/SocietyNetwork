const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');

router
    .route('/')
    .get(async (req, res) => {
        const users = await User.find().select('+password');

        await res.status(200).json({
            success: true,
            data: users,
        });
    })
    .post(
        [
            body('name', 'Name is required').not().isEmpty(),
            body('email', 'Please include a valid email').isEmail(),
            body(
                'password',
                'Please enter a password with 6 or more characters'
            ).isLength({ min: 6 }),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            const { name, email, password } = req.body;

            try {
                let user = await User.findOne({ email: email });

                // See if user exists
                if (user) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: `User already exists`,
                            },
                        ],
                    });
                }

                // Get users gravatar
                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'rg',
                    d: 'mm',
                });

                user = new User({
                    name,
                    email,
                    avatar,
                    password,
                });

                // Encrypt password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await user.save();

                // Return jsonwebtoken
                res.send(`User registered`);
            } catch (e) {
                console.error(e);
                res.status(500).send(`Server error`);
            }
        }
    );

module.exports = router;
