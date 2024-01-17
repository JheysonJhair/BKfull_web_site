
const router = require('express').Router();
const briefcaseController = require('../controllers/briefcaseController')


router.post('/register', briefcaseController.createBriefcase);
router.put('/update/:idBriefcase', briefcaseController.updateBriefcaseById);
router.delete('/delete/:idBriefcase', briefcaseController.deleteBriefcaseById);

module.exports = router;