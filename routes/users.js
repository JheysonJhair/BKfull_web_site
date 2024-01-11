const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.get('/interests', userController.getAllInterests);
router.get('/aptitudes', userController.getAllAptitudes);
router.get('/briefcase', userController.getAllBriefcase);
router.get("/downloadCV/:userId", userController.downloadCV);

module.exports = router;
