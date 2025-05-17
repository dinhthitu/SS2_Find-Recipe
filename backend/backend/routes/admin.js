const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { getUsers, getUserRecipes, addRecipe, updateRecipe, deleteRecipe, getTrashed, restoreRecipe, deletePermanently } = require('../controllers/adminController');

router.use(isAdmin);

router.get('/users', getUsers);
router.get('/users/:userId/recipes', getUserRecipes);
router.post('/users/:userId/recipes', addRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.get('/recipes/trash', getTrashed);
router.patch('/recipes/:id/restore', restoreRecipe);
router.delete('/recipes/:id/permanent', deletePermanently);

module.exports = router;