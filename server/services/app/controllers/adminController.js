const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Item, Category, User, Ingredient, sequelize } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let data = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) throw { name: "Email/password is required" };
      let foundEmail = await User.findOne({
        where: { email },
      });
      if (!foundEmail) throw { name: "invalid email/password" };
      let validatePassword = comparePassword(password, foundEmail.password);
      if (!validatePassword) throw { name: "invalid email/password" };
      let payload = {
        id: foundEmail.id,
        email: foundEmail.email,
      };
      let access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async showItem(req, res, next) {
    try {
      const data = await Item.findAll({
        include: [Category, Ingredient],
        order: [["id", "ASC"]]
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async detailItem(req, res, next) {
    try {
      const data = await Item.findByPk(req.params.id, {
        include: [Category, Ingredient]
      });
      if (!data) throw { name: "Item Not Found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addItem(req, res, next) {
    const t = await sequelize.transaction();
    try {
      console.log("test");
      const { name, description, price, imgUrl, CategoryId, userMongoDbId, ingredients } = req.body;
      const item = await Item.create({
        name,
        description,
        price,
        imgUrl,
        userMongoDbId,
        CategoryId,
      }, { transaction: t });
      const ingredientInput = ingredients.map((ingredient) => {
        return { name: ingredient.name, ItemId: item.id };
      });
      console.log(ingredientInput);
      await Ingredient.bulkCreate(ingredientInput, { transaction: t });
      await t.commit();
      res.status(201).json({
        msg: "Item has been added successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteItem(req, res, next) {
    try {
      const itemFound = await Item.findByPk(req.params.id);
      if (!itemFound) throw { name: "Item Not Found" };
      await Item.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        msg: "Item has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async editItem(req, res, next) {
    try {
      let {name, description, price, imgUrl, CategoryId} = req.body
      let findItem = await Item.findByPk(req.params.id);
      if(!findItem) throw {name: "Item Not Found"}
      await Item.update({name, description, price, imgUrl, CategoryId}, {where: {id: req.params.id}})
      res.status(200).json({msg: "Update Item Success"});
    } catch (err) {
      next(err)
    }
  }
  static async showCategory(req, res, next) {
    try {
      const data = await Category.findAll({
        order: [["id", "ASC"]]
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const categoryInput = {
        name,
      };
      await Category.create(categoryInput);
      res.status(201).json({
        msg: "Category has been added successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const categoryFound = await Category.findByPk(categoryId);
      if (!categoryFound) throw { name: "Category Not Found" };
      await Category.destroy({
        where: {
          id: categoryId,
        },
      });
      res.status(200).json({
        msg: "Category has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async detailCategory(req, res, next) {
    try {
      const data = await Category.findByPk(req.params.categoryId);
      if (!data) throw { name: "Category Not Found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    try {
      let { name } = req.body;
      let findCategory = await Category.findByPk(req.params.categoryId);
      if (!findCategory) throw { name: "Category Not Found" };
      await Category.update({ name }, { where: { id: req.params.categoryId } });
      res.status(200).json({ mmsg: "Update Category Success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
