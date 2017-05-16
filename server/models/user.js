const bcrypt = require('bcrypt');

module.exports = (Sequelize, DataTypes) => {
  'use strict';
  const User = Sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
    firstName: { type: DataTypes.STRING},
    lastName: { type: DataTypes.STRING},
    username: { type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING},
    emailAddress: { type: DataTypes.STRING, unique: true}
  }, {
    underscored: true,
    timestamps: true,
    paranoid: true,
    tableName: 'users',
    instanceMethods: {
      toJson(){
        let user = this.get();
        delete user.password;
        return user;
      },
      matchPasswords(candidatePassword) {
        const hash = this.password;

        return new Promise((resolve, reject) => {
          bcrypt.compare(candidatePassword, hash, (err, match) => {
            if(err) {
              reject(err);
            } else {
              resolve(match);
            }
          });
        });
      }
    },
    classMethods: {
      associate(models) {
        User.hasMany(models.Post, {
          onDelete: 'CASCADE'
        });

        User.hasMany(models.Comment, {
          onDelete: 'CASCADE'
        });
      }
    }
  });

  User.beforeCreate((user, options, next) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(!err) {
        bcrypt.hash(user.password, salt, (err, hashed) => {
          if(!err) {
            user.password = hashed;
            next();
          } else {
            next(err);
          }
        });
      } else {
        next(err);
      }
    });
  });

  return User;
}
