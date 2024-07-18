const express = require('express');
const { postUserData, getUserData } = require('../controllers/userController');
const router = express.Router();


router.post('/post', postUserData);
router.get('/get/:email', getUserData);

module.exports = router;