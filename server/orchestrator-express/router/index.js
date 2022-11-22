const router = require("express").Router();
const userRouter = require("./user");
const itemRouter = require("./item");

router.use("/items", itemRouter);
router.use("/users", userRouter);

module.exports = router;