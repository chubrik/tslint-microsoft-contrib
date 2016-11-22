"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noTypeofUndefinedRule', function () {
    var ruleName = 'no-typeof-undefined';
    it('should pass on normal comparisons', function () {
        var script = "\n            if(x === undefined) {}\n            if(x == undefined) {}\n            if(x === null) {}\n            if(x == null) {}\n\n            if(x === 'undefined') {}\n            if(x == 'undefined') {}\n\n            if(typeof x === 'object') {}\n            if(typeof x == 'object') {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on normal comparisons - yoda style', function () {
        var script = "\n            if(undefined === x) {}\n            if(undefined == x) {}\n            if(null === x) {}\n            if(null == x) {}\n\n            if('undefined' === x) {}\n            if('undefined' == x) {}\n\n            if('object' === typeof x) {}\n            if('object' == typeof) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on typeof strict comparison', function () {
        var script = "\n            if(typeof x === 'undefined') {}\n            if('undefined' === typeof x) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Avoid typeof x === 'undefined' comparisons. Prefer x == undefined or x === undefined: typeof x === 'undefined'",
                "name": "file.ts",
                "ruleName": "no-typeof-undefined",
                "startPosition": { "character": 16, "line": 2 }
            },
            {
                "failure": "Avoid typeof x === 'undefined' comparisons. Prefer x == undefined or x === undefined: 'undefined' === typeof x",
                "name": "file.ts",
                "ruleName": "no-typeof-undefined",
                "startPosition": { "character": 16, "line": 3 }
            }
        ]);
    });
    it('should fail on typeof weak comparison', function () {
        var script = "\n            if(typeof x == 'undefined') {}\n            if('undefined' == typeof x) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Avoid typeof x === 'undefined' comparisons. Prefer x == undefined or x === undefined: typeof x == 'undefined'",
                "name": "file.ts",
                "ruleName": "no-typeof-undefined",
                "startPosition": { "character": 16, "line": 2 }
            },
            {
                "failure": "Avoid typeof x === 'undefined' comparisons. Prefer x == undefined or x === undefined: 'undefined' == typeof x",
                "name": "file.ts",
                "ruleName": "no-typeof-undefined",
                "startPosition": { "character": 16, "line": 3 }
            }
        ]);
    });
});
