var express = require('express');
var app = express();

// Environments
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./server/config/env')[env];

// Express configuration
require('./server/config/config')(app, envConfig);

// Database
require('./server/config/database')(envConfig);

// Routes
require('./server/config/routes')(app);

// Start server
/*app.listen(process.env.PORT, function(){
  console.log('Server listening on port ' + process.env.PORT);
});*/
app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port);
});