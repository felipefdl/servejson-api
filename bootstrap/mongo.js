/*jslint node: true*/
/*globals GLOBAL, CONFIG, DB*/
'use strict';

var mongo = require('mongodb').MongoClient;

function seed(done) {
    if (done) { done(); }
}

function seed_test(done) {
    if (done) { done(); }
}

module.exports = function (done) {
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

        if (process.env.NODE_ENV === 'TEST') {
            seed_test(done);
        } else {
            seed(done);
        }
    });
};
