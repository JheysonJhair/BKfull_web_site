
const router = require('express').Router();
const aptitudesController = require('../controllers/aptitudesController')

router.post('/register', aptitudesController.createAptitudes);
router.put('/update/:idAptitudes', aptitudesController.updateAptitudesById);
router.delete('/delete/:idAptitudes', aptitudesController.deleteAptitudesById);


module.exports = router;