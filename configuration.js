/*jslint node:true*/
'use strict';

var format  = require('util').format;
var env     = process.env;
var configs = {
    "port"                  : env.PORT                  || 3001,
    "allow_origin"          : env.ALLOW_ORIGIN          || '*',
    "connString_mongo"      : env.DB_MONGO              || 'mongodb://localhost/servejson',
    "connString_mongo_test" : env.DB_MONGO_TEST         || 'mongodb://localhost/servejson-test',
    "newrelic"              : env.NEWRELIC              || false
};

// Config to test in Wercker
if (process.env.WERCKER_MONGODB_HOST) {
    var model, connectionString;

    model = 'mongodb://%s:%s/servejson-test';
    connectionString = format(model, env.WERCKER_MONGODB_HOST, env.WERCKER_MONGODB_PORT);
    configs.connString_mongo_test = connectionString;
}

module.exports = configs;
