const express = require('express');
const router = express.Router();

const DepartmentControlles = require('../controllers/departments.controller');

router.get('/departments', DepartmentControlles.getAll);
router.get('/departments/random', DepartmentControlles.getRandom);
router.get('/departments/:id', DepartmentControlles.getById);
router.post('/departments', DepartmentControlles.postNew);
router.put('/departments/:id', DepartmentControlles.modifyById);
router.delete('/departments/:id', DepartmentControlles.deleteById);

module.exports = router;