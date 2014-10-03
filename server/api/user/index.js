'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/add', controller.create);
router.post('/login', controller.login);
router.post('/resetFixture', controller.reset);
router.post('/unitTests', controller.runUnitTests);
// router.post('/login', controller.login);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;