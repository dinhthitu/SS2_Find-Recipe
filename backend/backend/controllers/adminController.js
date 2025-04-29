const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
  res.json(users);
};

exports.getUserRecipes = async (req, res) => {
  const recipes = await Recipe.findAll({ where: { UserId: req.params.userId, isDeleted: false } });
  res.json(recipes);
};

exports.addRecipe = async (req, res) => {
  const { title, description, ingredients, steps, imageUrl } = req.body;
  const recipe = await Recipe.create({ title, description, ingredients, steps, imageUrl, UserId: req.params.userId });
  res.status(201).json(recipe);
};

exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Not found' });
  Object.assign(recipe, req.body);
  await recipe.save();
  res.json(recipe);
};

exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Not found' });
  recipe.isDeleted = true;
  await recipe.save();
  res.json({ message: 'Moved to trash' });
};

exports.getTrashed = async (req, res) => {
  const trashed = await Recipe.findAll({ where: { isDeleted: true } });
  res.json(trashed);
};

exports.restoreRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (!recipe || !recipe.isDeleted) return res.status(404).json({ message: 'Not found or not trashed' });
  recipe.isDeleted = false;
  await recipe.save();
  res.json({ message: 'Restored' });
};

exports.deletePermanently = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (!recipe || !recipe.isDeleted) return res.status(404).json({ message: 'Not found or not trashed' });
  await recipe.destroy();
  res.json({ message: 'Permanently deleted' });
};