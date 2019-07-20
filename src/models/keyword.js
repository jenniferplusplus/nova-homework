'use strict';
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    keyword: DataTypes.STRING
  }, {});

  Keyword.associate = function(models) {
    Keyword.belongsTo(models.Upload)
  };
  return Keyword;
};
