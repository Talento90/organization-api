'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const organizations = require('./organizations');

module.exports.init = function (configs, db) {
    const app = express();

    // config express middlewares
    app.use(compression())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send(err);
    })

    // setup routes
    organizations.init(app, configs, db)

    return app;
};