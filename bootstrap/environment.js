/*jslint node: true*/
/*global GLOBAL*/
'use strict';

module.exports = function () {
    GLOBAL.CONFIG   = require('../configuration.js');
    GLOBAL.INFRA    = require('../infrastructure/');
    // GLOBAL.HELPERS  = require('../helpers/');
    GLOBAL.SERVICES = require('../services/');
};
