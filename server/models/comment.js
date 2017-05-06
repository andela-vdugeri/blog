
module.exports = (Sequelize, DataTypes) => {
  const Comment = Sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
    body: { type: DataTypes.TEXT},
  }, {
    underscored: true,
    tableName: 'comments',
    classMethods: {
      associate (models) {
        Comment.belongsTo(models.Post, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull:false
          }
        });
        Comment.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Comment;
}
