const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);

    if (!pro) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(pro);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
  
exports.getById = async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);

    if (!pro) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(pro);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
  
exports.postNew = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyById = (req, res) => {
  const { name, client } = req.body;

  try {
    Product.findByIdAndUpdate(req.params.id, { $set: { name: name, client: client } }, { new: true }, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = (req, res) => {
  try {
    Product.findByIdAndDelete(req.params.id, { new: false }, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};