const User = require("../models/user");
const hashPassword = require("../helpers/bcrypt");

class Controller {

  static async showUser(req, res) {
    try {
      let result = await User.findAll();
      result.map((el) => delete el.password);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  static async addUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const userInput = {
        username,
        email,
        password: hashPassword(password),
        role,
        phoneNumber,
        address,
      };
      await User.create(userInput);
      res.status(201).json({
        message: `User ${username} has been added successfully`,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async detailUser(req, res) {
    try {
      const { id } = req.params;
      let result = await User.findOne(id);
      delete result.password;
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.delete(id);
      res.status(200).json({
        message: `User has been deleted successfully`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;