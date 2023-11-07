const express = require('express');
const cors = require('cors')
const {errorHandler} = require('../middlewares/errorMiddleware')


function expressConfig(app) {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(errorHandler)
    app.use(cors())
}

module.exports = expressConfig