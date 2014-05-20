/*jslint node:true*/
/*globals DB, INFRA, after, suite, before, test, CONFIG, SERVICES*/
'use strict';

var assert = require('assert');

suite('Subdomain', function () {
    before(function (done) {
        require('../../../bootstrap/')(done);
    });

    after(function (done) {
        DB.collection('subdomain').remove({}, function () {
            DB.collection('route').remove({}, function () { done(); });
        });
    });

    suite('Check route middleware', function () {
        before(function (done) {
            DB.collection('subdomain').insert({"subdomain": "testsubdomain"}, function () {
                var obj = {
                    "subdomain"  : "testsubdomain",
                    "type"       : "get",
                    "route"      : "test",
                    "json"       : "{\n    \"result\": \"work\"\n}",
                    "created_at" : new Date()
                };
                DB.collection('route').insert(obj, function () { done(); });
            });
        });

        suite('Success', function () {
            test('Exist', function (done) {
                var req, res, next;
                req = {
                    "url": "test",
                    "method": "get",
                    "headers": {
                        "host": "testsubdomain"
                    }
                };

                res = {
                    "send": function (output) {
                        assert.equal('work', JSON.parse(output).result);
                        done();
                    }
                };
                next = function () {
                    assert.ok(false);
                    done();
                };

                INFRA.subdomain(req, res, next);
            });
        });

        suite('Unsuccessfully', function () {
            test('Not exist (url)', function (done) {
                var req, res, next;
                req = {
                    "url": "teste",
                    "method": "get",
                    "headers": {
                        "host": "testsubdomain"
                    }
                };

                res = {
                    "send": function () {
                        assert.ok(false);
                        done();
                    }
                };
                next = function () {
                    done();
                };

                INFRA.subdomain(req, res, next);
            });

            test('Not exist (method)', function (done) {
                var req, res, next;
                req = {
                    "url": "test",
                    "method": "post",
                    "headers": {
                        "host": "testsubdomain"
                    }
                };

                res = {
                    "send": function () {
                        assert.ok(false);
                        done();
                    }
                };
                next = function () {
                    done();
                };

                INFRA.subdomain(req, res, next);
            });

            test('Not exist (subdomain)', function (done) {
                var req, res, next;
                req = {
                    "url": "test",
                    "method": "post",
                    "headers": {
                        "host": "sddsaqweeeeeexxx1337"
                    }
                };

                res = {
                    "send": function () {
                        assert.ok(false);
                        done();
                    }
                };
                next = function () {
                    done();
                };

                INFRA.subdomain(req, res, next);
            });

            test('Reserved domain', function (done) {
                var req, res, next;
                req = {
                    "url": "test",
                    "method": "get",
                    "headers": {
                        "host": "api"
                    }
                };

                res = {
                    "send": function () {
                        assert.ok(false);
                        done();
                    }
                };
                next = function () {
                    done();
                };

                INFRA.subdomain(req, res, next);
            });
        });
    });
});
