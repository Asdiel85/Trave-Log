const express = require('express');
const {errorHandler} = require('../middlewares/errorMiddleware')


function expressConfig(app) {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(errorHandler)
}

module.exports = expressConfig