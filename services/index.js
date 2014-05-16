/*jslint node:true*/
'use strict';

exports.account = {
    'create': require('./accounts.create.js')
};
exports.route = {
    'create': require('./route.create.js'),
    'get': require('./route.get.js')
};

exports.docs = {
    'errors': require('./docs.errors.js')
};
