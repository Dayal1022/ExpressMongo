const express = require("express")
const { errorHandler } = require("./middleWare/errormiddleWare")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

const app = express()

//req body
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals', require('./routes/GoalsRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))