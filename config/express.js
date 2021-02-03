const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        defaultLayout: false
    }));
    app.set('view engine', 'hbs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('static'));
};