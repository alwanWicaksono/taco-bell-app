'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Item)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username is required"
        },
        notEmpty: {
          msg: "username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email is required"
        },
        notEmpty: {
          msg: "email is required"
        },
        isEmail: {
          args: true,
          msg: 'Please input email format correctly (example@yahoo.com)'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required"
        },
        notEmpty: {
          msg: "password is required"
        },
        len: {
          args: [5],
          msg: `Password must containt with 5 Characters Minimum`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "role is required"
        },
        notEmpty: {
          msg: "role is required"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(x => {
    x.password = hashPassword(x.password)
  })
  return User;
};