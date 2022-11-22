const express = require("express");
const app = express();
const router = require("./router");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});