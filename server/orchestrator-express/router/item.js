const router = require("express").Router();
const AppRouter = require("../controllers/itemController");

router.get("/", AppRouter.readAll);
router.post("/", AppRouter.createItem);
router.get("/:id", AppRouter.detailItem);
router.put("/:id", AppRouter.editItem);
router.delete("/:id", AppRouter.deleteItem);

module.exports = router;