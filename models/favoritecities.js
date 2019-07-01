'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteCities = sequelize.define('FavoriteCities', {
    location: DataTypes.STRING
  }, {});
  FavoriteCities.associate = function(models) {
    FavoriteCities.belongsTo(models['User'])
  };
  return FavoriteCities;
};
