'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.hasMany(models.Ingredient)
      // Item.belongsTo(models.User)
      Item.belongsTo(models.Category)
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name is required"
        },
        notEmpty: {
          msg: "name is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is required"
        },
        notEmpty: {
          msg: "description is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name is required"
        },
        notEmpty: {
          msg: "name is required"
        },
        min: {
          args: 1000,
          msg: "Minimum price is Rp 1.000"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgUrl is required"
        },
        notEmpty: {
          msg: "imgUrl is required"
        }
      }
    },
    userMongoDbId: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};