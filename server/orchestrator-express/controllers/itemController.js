const axios = require("axios")
const urlItem = "http://localhost:4002/items"
const urlUser = "http://localhost:4001/users"

const redis = require("../config/redis");

class Controller {
  static async readAll(req, res) {
    try {
      const itemsCache = await redis.get("app:items");
      if (itemsCache) {
        const data = JSON.parse(itemsCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(urlItem);
        await redis.set("app:items", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async createItem(req, res) {
    try {
      const itemInput = req.body;
      const { data } = await axios.post(urlItem, itemInput);
      await redis.del("app:items");
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async detailItem(req, res) {
    try {
      const { id } = req.params;
      let { data: item } = await axios.get(`${urlItem}/${id}`);
      if (!item) throw { name: "Item Not Found" };
      let { data: user } = await axios.get(`${urlUser}/${item.userMongoDbId}`);
      delete item.userMongoDbId;
      item.User = user;
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async editItem(req, res) {
    try {
      const { id } = req.params;
      const itemInput = req.body;
      const { data } = await axios.put(
        `${urlItem}/${id}`,
        itemInput
      );
      await redis.del("app:items");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(`${urlItem}/${id}`);
      await redis.del("app:items");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
}

module.exports = Controller