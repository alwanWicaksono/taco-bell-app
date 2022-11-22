if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require('cors');
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = process.env.PORT || 4002
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log("this app is running at port: ", port);
});