const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const interestsController = require('../controllers/interestsController');
const aptitudesController = require('../controllers/aptitudesController');
const briefcaseController = require('../controllers/briefcaseController');

const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


//User
router.post('/user/register', userController.createUser);
router.put('/user/update/:idUser', userController.updateUserById);
router.delete('/user/delete/:idUser', userController.deleteUserById);
router.put('/user/updateCV/:idUser', upload.single('cv'), userController.updateCVById);

//Interests
router.post('/interests/register', interestsController.createInterests);
router.put('/interests/update/:idInterests', interestsController.updateInterestsById);
router.delete('/interests/delete/:idInterests', interestsController.deleteInterestsById);

//Aptitudes
router.post('/aptitudes/register', aptitudesController.createAptitudes);
router.put('/aptitudes/update/:idAptitudes', aptitudesController.updateAptitudesById);
router.delete('/aptitudes/delete/:idAptitudes', aptitudesController.deleteAptitudesById);

//Briefcase
router.post('/briefcase/register', briefcaseController.createBriefcase);
router.put('/briefcase/update/:idBriefcase', briefcaseController.updateBriefcaseById);
router.delete('/briefcase/delete/:idBriefcase', briefcaseController.deleteBriefcaseById);

//Consultas generales
router.get('/users', userController.getAllUsers);
router.get('/interests', userController.getAllInterests);
router.get('/aptitudes', userController.getAllAptitudes);
router.get('/briefcase', userController.getAllBriefcase);
router.get("/downloadCV/:idUser", userController.downloadCV);

module.exports = router;
