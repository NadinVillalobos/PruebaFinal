const express = require('express');
const router = express.Router();


const departmentsController = require('../controllers/departmentsControllers');

router.get('/departments', departmentsController.getAllDepartments);

router.post('/departments/filter', departmentsController.filterDepartments);

module.exports = router;

