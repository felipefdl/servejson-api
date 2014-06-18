/*jslint node: true*/
/*globals CONFIG*/
'use strict';

exports.config = {
    app_name : ['servejson-api'],
    license_key : CONFIG.newrelic,
    logging : {
        level : 'trace'
    }
};
