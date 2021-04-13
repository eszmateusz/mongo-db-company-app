const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  };
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate('department');

    if (!emp) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(emp);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');

    if (!emp) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(emp);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save().then(newEmployee.populate('department').execPopulate());
    res.json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyById = (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    Employee.findByIdAndUpdate(req.params.id, { $set: { firstName: firstName, lastName: lastName, department: department } }, { new: true }, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    }).populate('department');
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = (req, res) => {
  try {
    Employee.findByIdAndDelete(req.params.id, { new: false }, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    }).populate('department');
  } catch (err) {
    res.status(500).json({ message: err });
  }
};