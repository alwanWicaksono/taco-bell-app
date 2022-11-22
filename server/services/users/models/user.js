const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connection");

class User {
  static users() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async findAll() {
    try {
      const users = this.users();
      const result = await users.find().toArray();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async create(userInput) {
    try {
      const users = this.users();
      const result = await users.insertOne(userInput);
      return result;
    } catch (error) {
      throw error
    }
  }
  static async findOne(id) {
    try {
      const users = this.users();
      const result = await users.findOne({
        _id: ObjectId(id),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      const users = this.users();
      const result = await users.deleteOne({
        _id: ObjectId(id),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;