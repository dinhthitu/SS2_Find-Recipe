const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('./Recipe');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'user' } // 'user' or 'admin'
});

User.hasMany(Recipe, { onDelete: 'CASCADE' });
Recipe.belongsTo(User);

module.exports = User;