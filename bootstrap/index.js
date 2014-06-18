/*jslint node: true*/
/*globals GLOBAL, CONFIG, DB*/
'use strict';

module.exports = function (done) {
    require('./environment.js')();
    require('./mongo.js')(done);

    if (CONFIG.newrelic) {
        require('newrelic');
    }
};
