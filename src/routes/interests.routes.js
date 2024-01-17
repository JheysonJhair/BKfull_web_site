const router = require('express').Router();
const interestsController = require('../controllers/interestsController')

router.post('/register', interestsController.createInterests);
router.put('/update/:idInterests', interestsController.updateInterestsById);
router.delete('/delete/:idInterests', interestsController.deleteInterestsById);

module.exports = router;