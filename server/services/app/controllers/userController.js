const {Item, Ingredient} = require("../models")

class Controller{
  static async showItem(req, res, next){
    try {
      const data = await Item.findAll()
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async detailItem(req, res, next){
    try {
      const data = await Item.findByPk(req.params.id, {
        include: [Ingredient]
      })
      if (!data) throw { name: "Item Not Found" };
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller