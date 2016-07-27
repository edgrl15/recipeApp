var express      = require('express'),
    logger       = require('morgan'),
    path         = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');

module.exports = function(app, envConfig){
    // view engine setup
    console.log('Direccion  : ' + path.join(envConfig.rootPath, 'client/views'));
    app.set('views', path.join(envConfig.rootPath, 'client/views'));
    app.set('view engine', 'jade');
    

    //app.use(favicon(envConfig.rootPath + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // telling Express to serve static objects from the /public/ dir, but make it seem like the top level
    app.use('/clientUse',express.static(path.join(envConfig.rootPath, 'client')));
    console.log('/clientUse : ' + path.join(envConfig.rootPath, 'client'));
};