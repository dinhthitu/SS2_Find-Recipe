const User = require('../models/User');
const Recipe = require('../models/Recipe');

exports.getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
  res.json(users);
};

exports.getUserRecipes = async (req, res) => {
  const { userId } = req.params;
  const recipes = await Recipe.findAll({ where: { userId } });
  res.json(recipes);
};

exports.addRecipe = async (req, res) => {
  const { userId } = req.params;
  const newRecipe = await Recipe.create({ ...req.body, userId });
  res.status(201).json(newRecipe);
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  await Recipe.update(req.body, { where: { id } });
  res.json({ message: 'Recipe updated' });
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await Recipe.destroy({ where: { id } });
  res.json({ message: 'Recipe deleted' });
};

exports.getTrashed = async (req, res) => {
  // Giả sử bạn dùng soft-delete, thêm where: { deletedAt: { [Op.ne]: null } }
  const recipes = await Recipe.findAll({ where: { isDeleted: true } });
  res.json(recipes);
};

exports.restoreRecipe = async (req, res) => {
  const { id } = req.params;
  await Recipe.update({ isDeleted: false }, { where: { id } });
  res.json({ message: 'Recipe restored' });
};

exports.deletePermanently = async (req, res) => {
  const { id } = req.params;
  await Recipe.destroy({ where: { id } });
  res.json({ message: 'Recipe permanently deleted' });
};
