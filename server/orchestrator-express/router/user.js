const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.readAll);
router.post("/", UserController.createUser);
router.get("/:id", UserController.detailUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;