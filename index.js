/*jslint node:true*/
/*globals CONFIG, INFRA*/
'use strict';

var bodyParser = require('body-parser');
var express    = require('express');
var util       = require('util');

// Initialize bootstrap
require('./bootstrap/')();

// Express Config
var app = express();
app.set('port', CONFIG.port);
app.use(bodyParser());
app.use(INFRA.allow_header.all);

// Routes Config
require('./routes.js')(app);

// Start server
app.listen(app.get('port'), function () {
    var msg = '';
    msg += '\n- \u001b[31mServeJSON - API';
    msg += '\u001b[31m at \u001b[0m';
    msg += 'http://localhost:%s\u001b[0m';
    msg  = util.format(msg, app.get('port'));
    console.info(msg);
});
