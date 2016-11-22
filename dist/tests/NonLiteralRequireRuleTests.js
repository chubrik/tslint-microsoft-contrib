"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('nonLiteralRequireRule', function () {
    var ruleName = 'non-literal-require';
    it('should pass on imports', function () {
        var script = "\n            import React = require('react');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on string literals', function () {
        var script = "\n            const myModule = require('myModule');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on empty array', function () {
        var script = "\n            const myModule = require([]);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on array of strings', function () {
        var script = "\n            const myModule = require(['myModule']);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on non string literal', function () {
        var script = "\n            const moduleName = 'myModule';\n            const myModule = require(moduleName);";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Non-literal (insecure) parameter passed to require(): moduleName",
                "name": "file.ts",
                "ruleName": "non-literal-require",
                "startPosition": { "character": 38, "line": 3 }
            }
        ]);
    });
    it('should fail on non-string array element', function () {
        var script = "\n            let myModule = require([\n                'myModule',\n                somethingElse,\n                'otherModule',\n                getModuleName()\n            ]);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Non-literal (insecure) parameter passed to require(): somethingElse",
                "name": "file.ts",
                "ruleName": "non-literal-require",
                "startPosition": { "character": 17, "line": 4 }
            },
            {
                "failure": "Non-literal (insecure) parameter passed to require(): getModuleName()",
                "name": "file.ts",
                "ruleName": "non-literal-require",
                "startPosition": { "character": 17, "line": 6 }
            }
        ]);
    });
});
