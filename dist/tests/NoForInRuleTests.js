/* tslint:disable:max-line-length */
"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noForInRule', function () {
    var ruleName = 'no-for-in';
    it('should pass on a regular for statement', function () {
        var script = "\n            for (var i = 0; i < 100; i++) {\n\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on a regular for-of statement', function () {
        var script = "\n            for (const item of array) {\n\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on for-in statement', function () {
        var script = "\n            for (name in object) {\n\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not use the 'for in' statement: 'for (name in object)'. If this is an object, use 'Object.keys' instead. If this is an array use a standard 'for' loop instead.",
                "name": "file.ts",
                "ruleName": "no-for-in",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
