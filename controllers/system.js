/*jslint node:true, unparam:true, nomen:true, stupid:true*/
/*globals SERVICES, INFRA*/
'use strict';

var yaml       = require('js-yaml');
var fs         = require('fs');
var path       = require('path');
var errorslist = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../docs/errors/en.yml'), 'utf8'));

function errors_list(req, res) {
    res.send(INFRA.rd.success(errorslist));
}

exports.errors_list = errors_list;
