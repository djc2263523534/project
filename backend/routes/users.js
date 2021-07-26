var express = require('express');
var router = express.Router();

const { singnUp, list, deleteId } = require('../controllers/users')

/* GET users listing. */
router.post('/', singnUp);

router.get('/', list)

router.delete('/del', deleteId)

module.exports = router;
