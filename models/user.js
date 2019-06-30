'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING
  },{});
  User.associate = function(models) {
    User.hasMany(models['FavoriteCities'])
  };
  return User;
};
