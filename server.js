"use: strict";

const express = require('express')
const app = express()
const port = process.env.PORT || "3000"
const host = process.env.HOST || "127.0.0.1"
const enviroment = process.env.NODE_ENV || "development"

app.get('/', (req, res) => {
    res.status(200).json({"data" : "jft"})
})

app.listen(port, () => {
    console.log(`Server listening @ ${host}:${port}\nEnviroment: ${enviroment}`)
})
