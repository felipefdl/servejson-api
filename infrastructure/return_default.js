/*jslint node:true*/
'use strict';

function error(code) {
    code = code || 1;
    var obj = {
        "status": false,
        "code": code
    };

    if (!Array.isArray(code)) {
        obj.code = [code];
    }

    return obj;
}

function success(result, msg) {
    var obj = {
        "status": true,
        "code": 0
    };

    if (result) {
        obj.result = result;
    }

    if (msg) {
        obj.message = msg;
    }

    return obj;
}

exports.success = success;
exports.error   = error;
