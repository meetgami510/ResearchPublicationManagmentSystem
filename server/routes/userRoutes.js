const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controllers/registerUser')
const {ownVerify} = require('../Controllers/ownVerify');
const { adminVerify } = require('../Controllers/adminVerify');

router.post('/register',registerUser);

router.get('/:id/verify/:token/',ownVerify)

router.get('/:id/adminverify/:token/',adminVerify);

module.exports = router;