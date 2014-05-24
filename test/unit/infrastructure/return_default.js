/*jslint node:true*/
/*globals suite, test, setup*/
'use strict';

var assert = require('assert');

suite('Return default', function () {
    var return_default;
    setup(function () {
        return_default = require('../../../infrastructure/return_default.js');
    });

    suite('Success', function () {
        test('with no parameter', function () {
            var result = return_default.success();
            assert.equal(result.status, true);
            assert.equal(result.code, 0);
        });

        test('with result', function () {
            var result = return_default.success('test ok');
            assert.equal(result.status, true);
            assert.equal(result.code, 0);
            assert.equal(result.result, 'test ok');
        });

        test('with result and message', function () {
            var result = return_default.success('test ok', 'msg');
            assert.equal(result.status, true);
            assert.equal(result.code, 0);
            assert.equal(result.result, 'test ok');
            assert.equal(result.message, 'msg');
        });
    });

    suite('Error', function () {
        test('with no parameter', function () {
            var result = return_default.error();
            assert.equal(result.status, false);
            assert.ok(Array.isArray(result.code));
            assert.equal(result.code[0], 1);
        });

        test('with code', function () {
            var result = return_default.error(123);
            assert.equal(result.status, false);
            assert.ok(Array.isArray(result.code));
            assert.equal(result.code[0], 123);
        });
    });
});
