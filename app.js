const express = require("express")
const cors = require("cors")
const app = express()


require('dotenv').config()

// var corsOptions = {
//   origin: "http://localhost:8081"
// }

// Error handling
const errorHandler = require('./utils/errorHandler')

// Routes
const apiRoute = require('./routes/apiRoute')

const db = require("./models");
db.woms_perf_db.sequelize.sync();
// db.woms_db.sequelize.sync();

app.use(cors())
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//app.use('/api', apiRoute)
app.use('/api/p_dashboard', apiRoute)
app.use(errorHandler)
require("./services/schedular.service").schedular()

// set port, listen for requests
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})