const express = require('express');
const router = express.Router();

const EmployeeControlles = require('../controllers/employees.controller');

router.get('/employees', EmployeeControlles.getAll);
router.get('/employees/random', EmployeeControlles.getRandom);
router.get('/employees/:id', EmployeeControlles.getById);
router.post('/employees', EmployeeControlles.postNew);
router.put('/employees/:id', EmployeeControlles.modifyById);
router.delete('/employees/:id', EmployeeControlles.deleteById);

module.exports = router;