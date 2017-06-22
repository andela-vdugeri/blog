
module.exports = (Sequelize, DataTypes) => {
  'use strict';

  const Post = Sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
    title: { type: DataTypes.TEXT },
    body: { type: DataTypes.BLOB }
  }, {
    underscored: true,
    paranoid: true,
    tableName: 'posts',
    classMethods: {
      associate(models) {
        Post.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Post;
}
