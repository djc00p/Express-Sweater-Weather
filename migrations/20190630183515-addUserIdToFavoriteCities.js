'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
    'FavoriteCities',
    'UserId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDELETE: 'SET NULL'
    }
  )
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'FavoriteCities',
      'UserId'
    )
  }
};
