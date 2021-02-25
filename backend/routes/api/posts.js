const express = require('express')
const router = express.Router()


// @route           GET api/posts
// @description     Test Route
// @access          Public
router.route('/').get((req,res) => {
    res.send(`Posts rout`)
})

module.exports = router
