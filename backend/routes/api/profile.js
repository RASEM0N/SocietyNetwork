const express = require('express')
const router = express.Router()


// @route           GET api/profile
// @description     Test Route
// @access          Public
router.route('/').get((req,res) => {
    res.send(`Profile rout`)
})

module.exports = router
