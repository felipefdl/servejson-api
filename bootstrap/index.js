/*jslint node: true*/
'use strict';

module.exports = function () {
    require('./environment.js')();
    require('./mongo.js')();
    //require('./newrelic.js')();
};
