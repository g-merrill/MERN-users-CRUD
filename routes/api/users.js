var express = require('express');
var router = express.Router();
var usersCtrl = require('../../controllers/api/users');

/* GET /api/users */
router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);
router.post('/', usersCtrl.create);
router.delete('/:id', usersCtrl.delete);
router.put('/:id', usersCtrl.update);

module.exports = router;
