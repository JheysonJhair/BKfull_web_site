const router = require("express").Router();
const userController = require("../controllers/userController");
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


router.post('/register', userController.createUser);
router.put('/update/:idUser', userController.updateUserById);
router.delete('/delete/:idUser', userController.deleteUserById);
router.put('/updateCV/:idUser', upload.single('cv'), userController.updateCVById);


//Consultas generales
router.get('/users', userController.getAllUsers);
router.get('/interests', userController.getAllInterests);
router.get('/aptitudes', userController.getAllAptitudes);
router.get('/briefcase', userController.getAllBriefcase);
router.get("/downloadCV/:idUser", userController.downloadCV);


module.exports = router;
