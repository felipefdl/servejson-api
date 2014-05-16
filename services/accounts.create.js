/*jslint node:true, todo:true*/
/*globals DB, INFRA*/
'use strict';

var v = require('validator');

function validation(body, res, cb) {
    var errors = [];

    if (!v.isEmail(body.mail)) {
        errors.push(1003);
        cb(errors);
        return;
    }

    if (!v.isLength(body.password, 6)) {
        errors.push(1004);
        cb(errors);
        return;
    }

    if (!v.isLength(body.user, 1)) {
        errors.push(1007);
        cb(errors);
        return;
    }

    DB.collection('accounts').findOne({'mail': body.mail}, function (err, data) {
        if (INFRA.err(err, res)) {
            return;
        }

        if (data) {
            errors.push(1005);
            cb(errors);
            return;
        }

        DB.collection('accounts').findOne({'user': body.user}, function (err, data) {
            if (INFRA.err(err, res)) {
                return;
            }

            if (data) {
                errors.push(1006);
            }

            cb(errors);
        });
    });
}

function create(req, res) {
    var body = req.body;

    validation(body, res, function (errors) {
        if (errors.length > 0) {
            res.send(INFRA.rd.error(errors));
            return;
        }

        var user = {
            'user': body.user,
            'mail': body.mail,
            'password': body.password, // TODO: Add bcrypt
            'created_at': new Date()
        };

        DB.collection('accounts').insert(user, function (err) {
            if (INFRA.err(err, res)) {
                return;
            }

            res.send(INFRA.rd.success());
        });
    });
}

module.exports = create;
