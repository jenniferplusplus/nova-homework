'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('Upload', {
    extension: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.INTEGER,
    md5: DataTypes.STRING
  }, {});
  Upload.associate = function(models) {
    // associations can be defined here
  };
  return Upload;
};