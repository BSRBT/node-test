const express = require('express');
const asyncHandler = require('express-async-handler');
const SmileTest = require('../models/SmileTest');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const smileTests = await SmileTest.find();
  res.json(smileTests);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const smileTest = await SmileTest.findById(req.params.id);
  if (!smileTest) return res.status(404).json({ message: 'Not Found' });
  res.json(smileTest);
}));

router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Name is required' });
  const newSmileTest = new SmileTest(req.body);
  const saved = await newSmileTest.save();
  res.status(201).json(saved);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const updated = await SmileTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not Found' });
  res.json(updated);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await SmileTest.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not Found' });
  res.json({ message: 'Deleted successfully' });
}));

router.post('/add', async (req, res) => {
  const { name, description } = req.body;
  await SmileTest.create({ name, description });
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  await SmileTest.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
