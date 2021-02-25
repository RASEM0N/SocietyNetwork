const express = require('express')
const router = express.Router()


// @route           GET api/auth
// @description     Test Route
// @access          Public
router.route('/').get((req,res) => {
    res.send(`Auth rout`)
})

module.exports = router
