const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.showUser);
router.post("/", Controller.addUser);
router.get("/:id", Controller.detailUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;