/*jslint node: true*/
'use strict';

module.exports = function (done) {
    require('./environment.js')();
    require('./mongo.js')(done);
    require('./newrelic.js')();
};
