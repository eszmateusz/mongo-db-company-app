const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);

    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);

    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json(newDepartment);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyById = (req, res) => {
  const { name } = req.body;

  try {
    Department.findByIdAndUpdate(req.params.id, { $set: { name: name } }, { new: true }, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = (req, res) => {
  try {
    Department.findByIdAndDelete(req.params.id, { new: false }, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' }) 
      : res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};