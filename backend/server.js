const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/', require("./router.js"))

app.listen(5001, () => console.log("server is running...5001"))
