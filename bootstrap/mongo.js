/*jslint node: true*/
/*globals GLOBAL, CONFIG*/
'use strict';

var mongo = require('mongodb').MongoClient;

module.exports = function () {
    var mongoconf = {
        "server": {
            "socketOptions": {
                "keepAlive": 1
            }
        }
    };

    mongo.connect(CONFIG.connString_mongo, mongoconf, function (err, db) {
        GLOBAL.DB = db;
        if (err) { console.error(err); }
    });
};
