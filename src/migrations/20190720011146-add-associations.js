'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Keywords',
      'UploadId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Upload',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: ''
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Keywords',
      'UploadId'
    )
  }
};
