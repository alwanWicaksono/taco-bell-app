const axios = require("axios")
const url = "http://localhost:4001/users"
const redis = require("../config/redis");

class Controller {
  static async readAll(req, res) {
    try {
      const usersCache = await redis.get("user:users");
      if (usersCache) {
        const data = JSON.parse(usersCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(url);
        console.log(data);
        await redis.set("user:users", JSON.stringify(data))
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async createUser(req, res) {
    try {
      await redis.del("user:users");
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const userInput = {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      };
      const { data } = await axios.post(url, userInput);
      res.status(201).json({message: "success create user"});
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async detailUser(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(`${url}/${id}`);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async deleteUser(req, res) {
    try {
      await redis.del("user:users");
      const { id } = req.params;
      await axios.delete(`${url}/${id}`);
      res.status(200).json({message: "success delete user"});
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
}

module.exports = Controller