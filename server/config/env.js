var path = require('path');
var rootPath   = path.normalize(__dirname + '/../../'); // normalizes to base path
console.log('rootPath : ' + rootPath);

module.exports = {
    development: {
        rootPath: rootPath,
        database: 'mongodb://localhost/recetaCosto',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        database: '',
        port: process.env.PORT || 80
    }
};